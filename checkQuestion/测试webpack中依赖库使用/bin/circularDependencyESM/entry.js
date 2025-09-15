import dependency from './dependency.js'
function entryTest() {
    console.log("dependency导入", dependency)
    dependency.dependencyTest();
}

export default {
    entryTest
};