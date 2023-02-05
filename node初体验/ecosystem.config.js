module.exports = {
    apps: [
        {
            name: 'Master', // 应用程序名称
            script: './express.ts', // 应用程序的脚本路径
            exec_interpreter: './node_modules/.bin/ts-node', // 应用程序的脚本类型
            instances: 1, // 启动进程数
            // 可以通过是否是docker来判断是用fork还是cluster exec_mode: isDocker() ? 'fork' : 'cluster',
            exec_mode: 'cluster', // 应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
            log_date_format: 'YYYY-MM-DD HH:mm Z', // 配置日志日期的输出格式
            error_file: './logs/err.log', // 错误日志文件，必须设置在项目外的目录，这里为了测试
            out_file: './logs/info.log', //  流水日志，包括 console.log 日志，必须设置在项目外的目录，这里为了测试
            min_uptime: '200s', // 最小运行时间，这里设置的是200s即如果应用程序在200s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量
            max_restarts: 10, // 设置应用程序异常退出重启的次数，默认15次（从0开始计数)
            cron_restart: '1 0 * * *', // 定时启动，解决重启能解决的问题
            args: 'master', // 这里会当做变量传入到对应的启动的服务里面
            // 设置不同环境的环境配置
            // 开发环境，对应--env 后的参数
            env_development: {
                NODE_ENV: 'dev',
                // PM2_SERVE_PATH: '.', // 静态服务路径
                // PM2_SERVE_PORT: 3001, // 静态服务器访问端口
                watch: true // 是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件
            },
            // 测试环境
            env_testing: {
                NODE_ENV: 'test',
                watch: false // 开发环境使用 true，其他设置为 false
            },
            // 生产环境
            env_production: {
                NODE_ENV: 'prod',
                watch: false // 开发环境使用 true，其他必须设置为 false
            }
        },
        {
            name: 'Worker', // 应用程序名称
            script: './express.ts', // 应用程序的脚本路径
            exec_interpreter: './node_modules/.bin/ts-node', // 应用程序的脚本类型
            instances: 3, // 启动进程数
            // 可以通过是否是docker来判断是用fork还是cluster exec_mode: isDocker() ? 'fork' : 'cluster',
            exec_mode: 'cluster', // 应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
            log_date_format: 'YYYY-MM-DD HH:mm Z', // 配置日志日期的输出格式
            error_file: './logs/err.log', // 错误日志文件，必须设置在项目外的目录，这里为了测试
            out_file: './logs/info.log', //  流水日志，包括 console.log 日志，必须设置在项目外的目录，这里为了测试
            min_uptime: '200s', // 最小运行时间，这里设置的是200s即如果应用程序在200s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量
            max_restarts: 10, // 设置应用程序异常退出重启的次数，默认15次（从0开始计数)
            cron_restart: '1 0 * * *', // 定时启动，解决重启能解决的问题
            // 设置不同环境的环境配置
            // 开发环境，对应--env 后的参数
            env_development: {
                NODE_ENV: 'dev',
                // PM2_SERVE_PATH: '.', // 静态服务路径
                // PM2_SERVE_PORT: 3001, // 静态服务器访问端口
                watch: true // 是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件
            },
            // 测试环境
            env_testing: {
                NODE_ENV: 'test',
                watch: false // 开发环境使用 true，其他设置为 false
            },
            // 生产环境
            env_production: {
                NODE_ENV: 'prod',
                watch: false // 开发环境使用 true，其他必须设置为 false
            }
        }
    ]
}
