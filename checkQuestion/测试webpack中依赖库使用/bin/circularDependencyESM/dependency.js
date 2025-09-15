// import entry from "./entry.js";
import('./entry.js').then((entry) => {
    console.log("entry导入", entry)
})
const dependencyTest = function () {
    
}

export default {
    dependencyTest
}
