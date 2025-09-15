const dependency = require('./dependency.cjs');
function entryTest() {
    console.log("dependency导入", dependency)
    dependency.dependencyTest();
}
module.exports = {
    entryTest
}