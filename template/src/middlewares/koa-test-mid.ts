/**
 * @author {{author}}
 * @description user middlewares
 */

import { Daruk, Context } from '@sina/daruk'

export default function (daruk:Daruk) {
  return async function (ctx:Context, next:Function) {
    return next()
  }
}
