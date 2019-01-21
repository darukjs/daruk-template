/**
 * @author {{author}}
 * @description user middlewares
 */

import { Daruk, Context } from '@sina/daruk';

export default (daruk: Daruk) => {
  return async (ctx: Context, next: Function) => {
    return next();
  };
};
