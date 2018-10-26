/**
 * @author {{author}}
 * @description routers user
 */
import { Context } from '@sina/daruk'

module.exports = function (userListController:Function) {
  return {
      get: [
        {
          path: '/',
          handle: async function (ctx: Context, next: Function) {
              // @ts-ignore
              await ctx.render('index');
              next()
          }
        },
        {
          path: '/list',
          handle: userListController
        }
      ],
      post: {
        path: '/update',
        handle: async function (ctx: Context, next: Function) {
          next()
        }
      }
  };
}
