let buf = Buffer.from('你说啥');
console.log('文字转buf', buf);
console.log(buf.toString('utf8'));
console.log(buf);


// 简单正则匹配占位符
const regPlaceholde = (target = '你是{1234}', callback) => {
    let reg = new RegExp('\\{.*\\}');
    return target.replace(reg, callback);
};
const callback = (num) => {
    return(
        {num}
    )
}
console.log(regPlaceholde('你是{1234}', callback.bind(null, 11)));

//迭代器
const arr = [1,2,3];
let iter = arr[Symbol.iterator]();
console.log(iter);
console.log(iter.next);
console.log(iter.return);
for(let i of iter) {
    console.log('i', i);
    if (i >1) {
        break;
    }
}
for(let i of iter) {
    console.log('i', i);
}