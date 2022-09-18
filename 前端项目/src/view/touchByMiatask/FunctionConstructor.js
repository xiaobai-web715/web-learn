/*测试构造函数保存为state状态问题*/
function FunctionConstructor(){
    const dom = document.createElement('div');
    dom.style.cssText = 'background-color:red;height:10px;';
    console.log(this.removeDom);
    this.addDom = () => {
        document.body.appendChild(dom); //调用该实例的addDom方法会将dom元素绑定到body的身上
    };
    this.removeDom = () => {
        document.body.removeChild(dom);
    };
}

export default FunctionConstructor;