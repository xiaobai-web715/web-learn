const path = require('path');
console.log(path.resolve('/res/require', '/node初体验/mode'))  //输出是e:\node初体验\mode
console.log(path.resolve('/res/require', 'node初体验/mode'))   //输出是e:\res\require\node初体验\mode
console.log(path.resolve('/res/require', './node初体验/mode')) //输出是e:\res\require\node初体验\mode
console.log(path.resolve('/res/require', '../node初体验/mode'))//输出是e:\res\node初体验\mode
