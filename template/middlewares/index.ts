/**
 * @author {{author}}
 * @description user middlewares
 */
import { Daruk, Context } from '@sina/daruk'

module.exports = function (daruk:Daruk) {
  daruk.registerMiddleware({
    name: 'koa-test-mid',
    export: function () {
      return async function (ctx:Context, next:Function) {
        ctx.body = JSON.stringify({
          optionA: 'A'
        })
        return next()
      }
    }
  })
  daruk.register('middleware', ['./nestMiddleware'])
}
