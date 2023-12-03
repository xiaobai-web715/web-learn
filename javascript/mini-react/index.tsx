interface IVNode {
  type: string;
  props: {
    [key in string]: any;
  } & {
    children: IVNode[];
  }; //使用交叉类型
}

interface IFiber {
  dom: Text | Element; //当前的dom节点
  type: string; //当前节点的类型
  props: {
    children: IVNode[]; //对应的虚拟dom对象构成的数组
  };
  parent: IFiber;
  child?: IFiber;
  sibling?: IFiber;
  alternate?: IFiber;
}

let nextUnitOfWork = null; //保存需要构建的fiber的信息
let wipRoot = null;
let currentRoot = null; //记录上一个dom结构树

// 创建Text节点
const createTextNode = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
};
// 创建虚拟dom对象
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextNode(child);
      }),
    },
  };
}

/**@jsx Diact.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b></b>
//   </div>
// );
const commitWork = (fiber: IFiber) => {
  if (!fiber) {
    return;
  }
  fiber.parent.dom.appendChild(fiber.dom); //将当前fiber的dom添加到父节点身上
  // 并且迭代当前fiber的child和sibling(兄弟)
  commitWork(fiber.child);
  commitWork(fiber.sibling);
};

const commitRoot = () => {
  // 当所有的fiber构建完成之后，在这里通过递归完成所有的dom append
  commitWork(wipRoot.child);
  // 记录上一个dom结构树
  currentRoot = wipRoot;
  wipRoot = null;
};

// react的render方法2 （此处的element应是babel通过Diact.createElement创建的虚拟dom对象）
const render = (element: IVNode, container: Element) => {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    child: null,
    alternate: currentRoot, //保留上一个节点的备份
  };
  nextUnitOfWork = wipRoot;
};

const createDom = (fiber: IFiber): Text | Element => {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  // 保证element.props里面除了children之外其他的key都与dom元素的key一样
  const isProperty = (key) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => dom[name] == fiber.props[name]);
  return dom;
};

// 抽出创建新fiber的代码, (并比较对应节点的type是不是相同)
const reconcileChildren = (wipFiber: IFiber, elements: IVNode[]) => {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;
  while (index < elements.length || oldFiber != null) {
    const element: IVNode = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: wipFiber, // 链表当中的指向父节点的指针
      dom: null,
    };

    // 为fiber创建子节点的指针，为
    if (index == 0) {
      wipFiber.child = newFiber; // 链表当中fiber指向child的指针指向第一个子节点
    } else {
      prevSibling.sibling = newFiber; // 每一个子节点的sibling(兄弟节点)为相邻的下一个节点
    }
    prevSibling = newFiber;
    index++;
  }
};

// 通过performUnitOfWork构建出虚拟dom链表
function performUnitOfWork(fiber: IFiber) {
  // 执行三个工作： 1.添加element to dom 2.创建fibers为childrens 3.选择下一个时间单元
  // 1.添加element to dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber); //创建真实的dom节点
  }
  /**
   * 此处注释原因： 因为浏览器有可能因为任务优先级中断dom的增加，为了防止用户看到不完全的dom
   */
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }
  // 2.创建fibers为childrens
  const elements: IVNode[] = fiber.props.children;

  reconcileChildren(fiber, elements);
  // let index = 0;
  // let prevSibling = null;
  // while (index < elements.length) {
  //   const element: IVNode = elements[index];

  //   const newFiber = {
  //     type: element.type,
  //     props: element.props,
  //     parent: fiber, // 链表当中的指向父节点的指针
  //     dom: null,
  //   };

  //   // 为fiber创建子节点的指针，为
  //   if (index == 0) {
  //     fiber.child = newFiber; // 链表当中fiber指向child的指针指向第一个子节点
  //   } else {
  //     prevSibling.sibling = newFiber; // 每一个子节点的sibling(兄弟节点)为相邻的下一个节点
  //   }
  //   prevSibling = newFiber;
  //   index++;
  // }
  // 3.返回后续需要构建的节点到下一个时间单元
  if (fiber.child) {
    return fiber.child; //如果当前节点有子节点，返回child进入下一个unit of woke
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      // 如果当前节点有兄弟节点
      return nextFiber.sibling; // 将兄弟节点进行返回
    }
    // 如果当前节点没有兄弟节点，向上返回一层到父节点寻找父节点的兄弟节点（最顶级的节点只有一个，执行到这里nextFiber.parent就是undefined ）
    nextFiber = nextFiber.parent;
  }
}

// react的Concurrent Mode => 防止render的dom tree过多阻塞主线程
// react的fiber概念，分成片段，当高优先级的任务需要执行的时候可以中断渲染
// 此处用requestIdleCallback进行模拟 => requestIdleCallback api用来执行低优先级的任务，默认会在浏览器空闲时间进行执行(并且为防止浏览器一直处于非空闲时间,提供options来设置一个时间)
const workLoop = (deadline: IdleDeadline) => {
  let shouldYeild = false;
  while (nextUnitOfWork && !shouldYeild) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYeild = deadline.timeRemaining() < 1; //timeRemaining()方法返回毫秒级的浏览器剩余时间（应该是16.6ms以内吧）
  }
  // nextUnitOfWork为false的情况就是最上一层的dom通过performUnitOfWork
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
};

requestIdleCallback(workLoop);

const Didact = {
  createElement, //构建建议dom对象
  render, //创建真实的dom
};
