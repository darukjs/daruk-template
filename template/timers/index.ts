/**
 * @author {{author}}
 * @description user timers
 */
import { Daruk } from '@sina/daruk'

module.exports = function (daruk:Daruk) {
    daruk.registerTimer({
        name: 'mytimer',
        config: {
            cronTime: '* * * * * *', //一秒一次
            onTick: function (this: any) {
                console.log('mytimer onTick')
                this.stop(); //停止时会进入complete
            },
            onComplete: function () {
                console.log('mytimer onComplete')
            }
        }
    })
}