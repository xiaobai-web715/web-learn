// 在 Jenkins 中执行 shell 脚本（使用 sh 命令）时，每个 shell 命令都是在一个单独的 shell 进程中运行的,所以目前的写法就是进去目录以及安装构建的过程都是在一行去操作的
// 要是npm可以使用需去docker jenkins容器当中安装nvm 以及source .bashrc文件 (可能还会涉及到source的使用问题, sh => dash 变成bash的软连接可以使用source,安装的话root用户安装完成要将root/.nvm 移出,然后重新设置source的环境变量,非root可以在var下面的home(可能会拼一个用户名作为一个前缀)里面加上一个bashrc文件键入root安装完成之后的内容,source一下)
pipeline {
    // agent {
    //     docker {
    //         image 'node:6-alpine' 
    //         args '-p 3000:3000' 
    //     }
    // }
    agent any
    stages {
        stage('Clean') {
            steps {
                sh 'rm -rf *'
                sh 'rm -rf .g*'
            }
        }
        stage('Check out') {
            steps {
                sh 'git clone git@github.com:xiaobai-web715/web-learn.git'
                sh 'ls -l'
                // dir('${WorkName}/${ProjectName}') {
                //     sh 'git checkout ${Tag}'
                // }
                sh 'cd ${WorkName}/${ProjectName} && pwd && git checkout ${Tag}' 
            }
        }
        stage('Front Install') { 
            steps {
                sh 'cd ${WorkName}/${ProjectName} && pwd && npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'cd ${WorkName}/${ProjectName} && pwd && npm run build'
            }
        }
    }
}