/**
 * @author {{author}}
 * @description user timers
 */
import { Daruk } from '@sina/daruk'

export default function (daruk:Daruk) {
  daruk.registerTimer({
    name: 'mytimer',
    export: function () {
      return {
        cronTime: '* * * * * *', //一秒一次
        onTick: function (this: any) {
          daruk.logger.info('mytimer onTick')
          this.stop(); //停止时会进入complete
        },
        onComplete: function () {
          daruk.logger.info('mytimer onComplete')
        }
      }
    }
  })
}