/**
 * @author {{author}}
 * @description user timers
 */
module.exports = function (daruk: any) {
    daruk.registerTimer({
        name: 'timerTest',
        config: {
            cronTime: '* * * * * *', //一秒一次
            onTick: function (this: any) {
                console.log('timerTest onTick')
                this.stop(); //停止时会进入complete
            },
            onComplete: function () {
                console.log('timerTest onComplete')
            }
        }
    })
}