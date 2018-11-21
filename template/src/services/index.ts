/**
 * @author {{author}}
 * @description user services
 */
import { Daruk } from '@sina/daruk'

module.exports = function (daruk:Daruk, multi:Function, sum:Function) {
  daruk.registerService([{
    name: 'myService',
    export: function () {
      return {
        sum (a:number, b:number) {
          return a + b
        }
      }
    }
  }, {
    name: 'injectService',
    export: function () {
      return function (a:number, b:number) {
        return multi(a, b)
      }
    }
  }])
  daruk.register('service', ['./file-service'])
}
