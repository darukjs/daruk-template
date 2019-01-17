/**
 * @author {{author}}
 * @description routers user
 */
import { Context } from '@sina/daruk'

export default function () {
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
          handle: (ctx: Context) => ctx.userListController.index()
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
