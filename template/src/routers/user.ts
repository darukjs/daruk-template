/**
 * @author {{author}}
 * @description routers user
 */
import { Context } from '@sina/daruk';

export default () => {
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
        handle: (ctx: Context) => ctx.controller.UserList.index()
      }
    ],
    post: {
      path: '/update',
      handle: (ctx: Context) => ctx.controller.UserList.index()
    }
  };
};
