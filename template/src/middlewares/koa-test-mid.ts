/**
 * @author {{author}}
 * @description user middlewares
 */

import { Context, Daruk } from '@sina/daruk';

export default (daruk: Daruk) => {
  return async (ctx: Context, next: Function) => {
    ctx.set('X_CUSTOM_FLAG', 'daruk');
    return next();
  };
};
