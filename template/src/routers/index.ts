/**
 * @author {{author}}
 * @description routers index
 */
import { Context } from '@sina/daruk';

export default () => {
  return {
    get: [
      {
        path: '/',
        handle: async (ctx: Context, next: Function) => {
          await ctx.render('index');
        }
      }
    ]
  };
};
