/**
 * @author {{author}}
 * @description config for daruk
 */

import { join } from 'path';

module.exports = function (globalConfig: any) {

    {{#if_in globalModules "node-rdkafka"}}
    globalConfig.globalModules['node-rdkafka'].install = true;
    globalConfig.globalModules['node-rdkafka'].config = {};
    {{/if_in}}

    globalConfig.middleware.set('koa-ejs', function (this:any,mid: Function) {
        mid(this.app, {
            root: join(this.root, './view'),
            viewExt: 'html',
            layout: 'layout',
            cache: false,
            debug: false
        });
        return false;
    });

    globalConfig.middlewareOrder = [
        'utils2ctx',
        'service2ctx', 
        '@sina/koa-logger', 
        'koa-handle-error', 
        'koa-x-request-id', 
        'asyncStore', 
        'koa-favicon', 
        'koa-static', 
        'koa-bodyparser', 
        'koa-ejs'
    ];
}
