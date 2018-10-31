
import { Context } from '@sina/daruk'

module.exports = function (sum: Function) {
  return {
    name: 'nest-mid',
    export: function () {
      return async function (ctx:Context, next:Function) {
        if (/^\/nestMiddleware/.test(ctx.request.url)) {
          ctx.body = sum(parseInt(ctx.query.a), parseInt(ctx.query.b))
        }
        return next()
      }
    }
  }
}
