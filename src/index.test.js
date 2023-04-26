const lib  = require('.')

jest.setTimeout(30000);

// test('sync funciotn test', async () => {
//     let checkVal
//     let runTimesA = 0
//     let runTimesB = 0  

//     // sync loop A
//     lib.loop(function(runTimes){
//         console.log("sync loop A", runTimes)
//         checkVal = 0
//         expect(checkVal).toBe(0)
//     }, 10)

//     // sync loop B
//     lib.loop(function(runTimes){
//         console.log("sync loop B", runTimes)
//         checkVal = 1

//         expect(checkVal).toBe(1)
//     })

//     await lib.waitFinish()
// })

// 由於js內異步方法會被丟掉web api等到時間結束後才放回task queue的特性
// 因此checkVal有可能會被其他function修改
// 導致跟原始修改值不一樣
test('async sync funciotn test', async () => {
    let checkVal
    // async loop A
    lib.loop(async function(runTimes){
        console.log("async loop A", runTimes)
        checkVal = 0
        await lib.api(10)
        // 這個不一定是0
        expect(checkVal).toBe(0)
    }, 10)

    // async loop B
    lib.loop(async function(runTimes){
        console.log("async loop B", runTimes)
        checkVal = 1
        await lib.api(10)
        // 這個不一定是1
        expect(checkVal).toBe(1)
    })

    await lib.waitFinish()
})

