const test = (...args) => {
    console.log(args)
}
const ns = test.bind(null,'123', '456');
ns('789')