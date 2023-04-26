const RunLimit = 1000
const loopTask = {}
let loopIdx = 0

function api(ms){// this is api ....
    return new Promise(function(resolve){
        setTimeout(function(){
            return resolve()
        }, ms)
    })
}

function loop(callback){
    let runTimes = 0
    loopIdx++
    let taskId = loopIdx // 在此賦值taskId避免loopIdx被其他進程修改到
    loopTask[taskId] = 0

    const interval = setInterval(() => {
        callback(runTimes)

        runTimes++
        if(runTimes >= RunLimit) {
            loopTask[taskId] = 1
            clearInterval(interval)
        }
    }, 10);    
}

function waitFinish(){
    return new Promise(function(resolve){

        const checkLoop = setInterval(function(){
            if(Object.values(loopTask).every((task)=> task == 1)) {// 確認每個任務都完成了
                clearInterval(checkLoop)
                return resolve()
            }
        }, 100)
    })
}   

module.exports = {
    loop, waitFinish, api
}