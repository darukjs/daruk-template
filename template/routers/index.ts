/**
 * @author {{author}}
 * @description routers index
 */
module.exports = function () {
    return {
        get: [{
            path: '/',
            handle: async function (ctx: any, next: Function) {
                await ctx.render('index');
            }
        }]
    };
}
