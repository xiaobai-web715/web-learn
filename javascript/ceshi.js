// let buf = Buffer.from('你说啥');
// console.log('文字转buf', buf);
// console.log(buf.toString('utf8'));
// console.log(buf);


// // 简单正则匹配占位符
// const regPlaceholde = (target = '你是{1234}', callback) => {
//     let reg = new RegExp('\\{.*\\}');
//     return target.replace(reg, callback);
// };
// const callback = (num) => {
//     return(
//         {num}
//     )
// }
// console.log(regPlaceholde('你是{1234}', callback.bind(null, 11)));

// //迭代器
// const arr = [1,2,3];
// let iter = arr[Symbol.iterator]();
// console.log(iter);
// console.log(iter.next);
// console.log(iter.return);
// for(let i of iter) {
//     console.log('i', i);
//     if (i >1) {
//         break;
//     }
// }
// for(let i of iter) {
//     console.log('i', i);
// }

var uniquePathsIII = function(grid) {
    let zeroNum = 0;
    let depthPath = [];
    let status = new Array(grid.length).fill(0).map(item => {
        let arr = new Array(grid[0].length).fill(0)
        return arr.map(item => new Array(4).fill(0))
    })
    let targetPath = 0;
    grid.forEach((row, indexRow) => {
        row.forEach((column, indexColumn) => {
            if (column === 0) {
                zeroNum += 1;
            } else if (column === 1) {
                depthPath[depthPath.length] = [indexRow, indexColumn]
            }
        })
    })
    const success = () => {
        let location = depthPath.slice(-1)[0];
        let row = location[0];
        let column = location[1];
        //当前节点的上下左右进行判断
        console.log('上下左右的状态', status[row][column], row, column);
        if (row > 0 && status[row][column][0] === 0) {
            //上
            if (grid[row-1][column] === 0) {
                depthPath[depthPath.length] = [row-1, column]; //添加可以走的下一个节点
                grid[row][column] = -1 //当前节点变成-1之后不允许通过
                success();
            } else if (grid[row-1][column] === 2 && zeroNum === (depthPath.length - 1)) {
                console.log('我不配吗')
                targetPath += 1
            }
        }
        if (row < (grid.length - 1)  && status[row][column][1] === 0) {
            //下
            if (grid[row + 1][column] === 0) {
                depthPath[depthPath.length] = [row+1, column]; //添加可以走的下一个节点
                grid[row][column] = -1 //当前节点变成-1之后不允许通过
                success();
            } else if (grid[row+1][column] === 2 && zeroNum === (depthPath.length - 1)) {
                console.log('我不配吗')
                targetPath += 1
            }
        }
        if (column > 0 && status[row][column][2] === 0) {
            //左
            if (grid[row][column - 1] === 0) {
                depthPath[depthPath.length] = [row, column-1]; //添加可以走的下一个节点
                grid[row][column] = -1 //当前节点变成-1之后不允许通过
                success();
            } else if (grid[row][column-1] === 2 && zeroNum === depthPath.length - 1) {
                console.log('我不配吗')
                targetPath += 1
            }
        }
        if (column < (grid[0].length - 1) && status[row][column][3] === 0) {
            //右
            if (grid[row][column + 1] === 0) {
                depthPath[depthPath.length] = [row, column+1]; //添加可以走的下一个节点
                grid[row][column] = -1 //当前节点变成-1之后不允许通过
                success();
            } else if (grid[row][column+1] === 2 && zeroNum === depthPath.length - 1) {
                console.log('我不配吗')
                targetPath += 1
            }
        }
        depthPath.pop() //走到这里说明可以回溯了 将当前节点进行退出
        status[row][column] = new Array(4).fill(0) //并将当前节点的上下左右可以通过的状态进行回溯
        grid[row][column] = 0 //当前节点被走过的状态进行回溯


        //对前一个节点的上下左右的状态进行控制
        let fatherRoot = depthPath.slice(-1)[0];
        console.log('fatherRoot', fatherRoot)
        if (depthPath.length > 0) {

            let fatherRootRow = fatherRoot[0];
            let fatherRootColumn = fatherRoot[1];
            console.log('father', fatherRootRow, fatherRootColumn)
            console.log('son', row, column)
            if (column === fatherRootColumn) {
                if (fatherRootRow > row) {
                    //子节点在父节点的上面
                    status[fatherRootRow][fatherRootColumn][0] = -1;
                } else {
                    status[fatherRootRow][fatherRootColumn][1] = -1;
                }
            } else if (row === fatherRootRow) {
                if (fatherRootColumn > column) {
                    //子节点在父节点的左边
                    status[fatherRootRow][fatherRootColumn][2] = -1;
                } else {
                    status[fatherRootRow][fatherRootColumn][3] = -1;
                }
            }
            success()
        } else {
            return targetPath;
        }
        // console.log('我应当是最后一个出栈', depthPath)
        // console.log('我是depthPath的长度', depthPath.length)
        // if (depthPath.length > 0) {
        //     // console.log('targetPath', targetPath)
            
        // } else {
        //     // console.log('targetPath', targetPath)
        //     return targetPath
        // }
    }
    return success()
};

console.log(uniquePathsIII([[0,0,0,0,0,0,2,0,0,0],[0,0,0,0,0,0,0,0,1,0]]))