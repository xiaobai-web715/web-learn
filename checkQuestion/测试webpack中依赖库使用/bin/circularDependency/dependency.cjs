// const { memoize } = require('./utils.cjs');
// const entry = require('./entry.cjs')
const entryFn = () => require('./entry.cjs')
const dependencyTest = function () {
    const entry = entryFn();
    console.log("entry导入", entry)
}
module.exports = {
    dependencyTest
}