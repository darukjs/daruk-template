/**
 * @author {{author}}
 * @description routers user
 */
import { Context } from '@sina/daruk';

export default function() {
  return {
    get: [
      {
        path: '/',
        handle: async (ctx: Context, next: Function) => {
          await ctx.render('index');
          next();
        }
      },
      {
        path: '/list',
        handle: (ctx: Context) => ctx.controller.userList.index()
      }
    ],
    post: {
      path: '/update',
      handle: async (ctx: Context, next: Function) => {
        next();
      }
    }
  };
}
