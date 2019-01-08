/**
 * @author {{author}}
 * @description user utils
 */
import { Daruk } from '@sina/daruk'

export default function (daruk:Daruk) {
  daruk.registerUtil({
    name: 'sum',
    export: function () {
      return function (a:number, b:number) {
        return a + b
      }
    }
  })
  daruk.registerUtil({
    name: 'multi',
    export: function () {
      return function (a:number, b:number) {
        return a * b
      }
    }
  })
}
