const axios = require('axios');
const chalk = require('chalk')
const {log} = require('console')
function getList() {
    // return axios.get('http://127.0.0.1:8201/admin/hosp/hospitalList/findAll');
    return axios.post("https://api.juejin.cn/content_api/v1/article/detail",{
        article_id: '6909002738705629198'
    })
}

//请求队列(生成等待执行请求的数组列表)
const requestList = new Array(100).fill(0).map(() => {
    return getList()
})

// console.log('requestList', requestList)

async function concurrentRun(taskList = [], max = 5, taskName='未命名任务') {
    // console.log('我没有执行吗')
    if (taskList.length < 1) return null;
    log(chalk.blue(`开始执行多个异步任务，最大并发数：${max}`));
    const taskCount = taskList.length; //执行的任务数量
    const replayList = [] //存储执行的结果
    const startTime = new Date().getTime();
    let current = 0;
    const schedule = async (index) => {
        return new Promise((resolve, reject) => {
            const task = taskList[index];
            if (!task) {
                console.log('我执行啦')
                return resolve(true)
            } else {
                task.then(async res => {
                    // console.log(res.data)
                    // console.log('res', res, `第${index}个请求`);
                    if (res.status == 200 || res.data.code == 200) {
                        // console.log('满足条件')
                        replayList[index] = res.data
                    } else {
                        replayList[index] = false
                    }
                    ++current
                    // log(`${taskName} 事务进度 ${((++current/taskCount) * 100).toFixed(2)}%`)
                    // console.log('执行前')
                    await schedule(index + max)
                    // console.log('执行后')
                    resolve(true)
                })
            }
        })
    }

    //任务事件池
    const scheduleList = new Array(max).fill(0).map((index) => {
        return schedule(index);
    })

    await Promise.all(scheduleList).then((args) => {
        console.log('args', args, current)
    });
    const cost = (new Date().getTime() - startTime)/1000
    log(chalk.green(`执行完成，任务数量：${taskList.length}，最大并发数：${max}，耗时：${cost}s`));
    return replayList
}

console.info(concurrentRun(requestList, 1, '任务测试'))
