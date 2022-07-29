const fs = require('fs');
console.log(process.cwd());
//process.cwd()获取的是node进程启动的环境(可以理解为你终端中所有运行文件的起点,也就是node命令的起点目录)
console.log(fs.realpathSync(process.cwd())); //返回解析的路径名

console.log(process.stdout.isTTY, '检查node是否运行在文本终端上下文环境中');