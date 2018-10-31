/**
 * @author {{author}}
 * @description routers index
 */
import { Context } from '@sina/daruk'

module.exports = function () {
    return {
        get: [{
            path: '/',
            handle: async function (ctx: Context, next: Function) {
                // @ts-ignore
                await ctx.render('index');
            }
        }]
    };
}
