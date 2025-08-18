import { ResolverFactory, CachedInputFileSystem } from 'enhanced-resolve';
import { resolve, dirname} from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const appSrc = resolve(__dirname, "..", "test")
console.log("appSrc", appSrc, __dirname)
const targetFile = 'src/index'
const alias = {
    "@": appSrc,
    src: appSrc
}
const myResolver = ResolverFactory.createResolver({
    alias,
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    fileSystem: new CachedInputFileSystem(fs, 60000)
})

const lookupStartPath = 'C:\\project\\test\\web-learn\\react18\\src\\entry'
myResolver.resolve(
    {},
    lookupStartPath,
    targetFile,
    {},
    (err, filepath) => {
        console.log("err", err)
        console.log("filepath", filepath)
    }
)
/**
 * 20250818 - 初步测试效果，需targetFile与alias组成的文件路径真实存在才可正确输出filepath，否则会报错打印err
 */