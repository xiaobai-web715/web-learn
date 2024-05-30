import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface(
    {
        input: process.stdin, // 从当前可读流读取数据 => node进程中可以通过从命令行接收用户输入
        output: process.stdout // 将数据写入一个可写流
    }
)

rl.question(
    '当前版本：',
    (version) => {
        console.log("我是获取的当前版本信息", version)
        fs.writeFile('version.txt', version, (error) => {
            if (error) throw error
            console.log(`版本信息${version}已写入version.txt`)
            rl.close()
        })
    }
)