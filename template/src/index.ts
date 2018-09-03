/// <reference path="daruk.d.ts"/>
/**
 * @author xiaojue
 * @date 2018-8-26
 * @fileoverview daruk core
 */


import { globalConfig } from './configs/';
var colors = require('colors/safe');
let path = require('path');
let os = require('os');
let join = path.join;
let fs = require('fs');
let pathToPackage = require('global-modules-path');
const koa = require("koa");
const EventEmitter = require('events');
const Logger = require("@sina/koa-logger").logger;
const loggerMiddleware = require('@sina/koa-logger').middleware
const isJsfile = /\.js|\.ts/;
const Router = require('koa-router');
const ShutDown = require('http-server-shutdown');

const NODE_ENV = process.env.NODE_ENV;

function findSync(startPath: string, isFind: RegExp) {
    let result: Array<string> = [];
    function finder(path: string) {
        let files = fs.readdirSync(path);
        files.forEach((val: string) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile() && isFind.test(val)) result.push(fPath);
        });
    }
    finder(startPath);
    return result;
}

class daruk extends EventEmitter {
    app: any;
    noop: Function;
    name: string;
    logger: any;
    router: any;
    options: darukOptions;
    modules: any;
    mail: any;
    root: string;
    debug: Function;
    package: any;
    server: any;
    constructor(name: string, options: darukOptions = {
        routerPath: 'routers',
        servicePath: 'services',
        middlewarePath: 'middlewares',
        monitorPath: 'monitors',
        utilPath: 'utils',
        configPath: 'configs'
    }) {
        super();
        this.app = new koa();
        this.router = new Router();
        this.root = path.dirname(require.main.filename);
        this.package = require(join(this.root, 'package.json'));
        for (let name in options) {
            if (options.hasOwnProperty(name)) {
                options[name] = path.join(this.root, options[name]);
            }
        }
        this.options = options;
        this.name = name;
        this.logger = new Logger({
            level: NODE_ENV === 'production' ? 'info' : 'silly', // log等级，超过该级别的日志不会输出
            customLevels: { // 自定义log等级
                access: 2
            },
            transports: {
                file: false, // 输出日志文件的路径
                console: true // 是否在终端输出日志
            },
            overwriteConsole: false, // 是否覆写console对象上的方法
            logExt: { // 加到日志对象中的额外信息
                logType: name
            },
            disable: false, // 禁止输出日志
            notStringifyLevles: [ // 不对日志的message字段进行JSON.stringify的日志等级
                'access'
            ]
        });
        this.logger.debug = (msg: string) => {
            console.log(colors.blue(`[debug] [${(new Date()).toLocaleString()}] [ ${msg} ]`));
        }
        this.modules = {};
        this.noop = () => { };
        this.debug = this.logger.debug;
        this.initEnv();
        this.mail = this.getService('nodemailer').createTransport(this.getConfig("nodemailer", "service"));
        this.mail.verify((err: any, success: any) => {
            if (err) {
                this.logger.error(err.message);
            } else {
                this.logger.debug('nodemailer is connected');
            }
        })
    }
    /**
     * 自动初始化路由，中间件，服务，工具函数等到实例
     */
    private initEnv() {
        //增加access中间件
        let self = this;
        this.registerMiddleware({
            name: '@sina/koa-logger',
            export: loggerMiddleware,
            config: {
                transform(logObj: any) {
                    self.logger.access(logObj);
                },
                filter(ctx: any) {
                    return true;
                }
            }
        });
        this.initConfig();
        this.initMiddleware();
        this.initRouter();
    }
    private initConfig() {
        //读取项目配置
        require(this.options.configPath)(globalConfig);
        this.debug(`globalConfig required`);
        //读取全局配置
        let types = ['globalModules', 'service', 'middleware', 'utils', 'monitors'];
        types.forEach(name => {
            if (!this.modules[name]) this.modules[name] = {};
            Object.keys(globalConfig[name]).forEach(module => {
                if (name === 'globalModules' && globalConfig[name][module].install) {
                    let globalPath = pathToPackage.getPath(module);
                    if (globalPath) {
                        this.modules[name][module] = {
                            config: globalConfig[name][module].config,
                            export: require(globalPath)
                        }
                    } else {
                        this.logger.error(`${module} is not found in global module path`);
                    }
                } else {
                    this.modules[name][module] = {
                        config: globalConfig[name][module],
                        export: require(module)
                    }
                }
            });
        });
    }
    private loadRouters(routerPath: string) {
        let RouterObject: any = {};
        let routers = findSync(routerPath, isJsfile);
        routers.forEach(file => {
            let router = require(file);
            if (router) {
                let path = file.replace(routerPath, '').replace(isJsfile, '').replace(/\/index$/g, '/');
                RouterObject[path] = router;
            }
        });
        return RouterObject;
    }
    private initRouter() {
        let routers = this.loadRouters(this.options.routerPath)
        Object.keys(routers).forEach(path => {
            this.router.methods.forEach((method: string) => {
                let router = typeof routers[path] === 'function' ? routers[path](this) : this.noop(this);
                if (!router) return;
                let lowerMethod = method.toLocaleLowerCase()
                let ret = router[method] || router[lowerMethod];
                if (ret) {
                    let rets = Array.isArray(ret) ? ret : [ret];
                    rets.forEach((ret) => {
                        let routerPath = path
                        if (ret.path) {
                            routerPath = join(path, ret.path);
                        }
                        this.router[lowerMethod](routerPath, ret.handle.bind(this));
                        this.debug(`${lowerMethod} - ${routerPath} router is auto init`)
                    })
                }
            });
        })
    }
    //初始化中间件，在初始化router之前。
    private initMiddleware() {
        let middlewares = this.modules.middleware;
        Object.keys(middlewares).forEach(name => {
            let config = this.getConfig(name, 'middleware');
            let mid = middlewares[name].export;
            let middleware = (typeof config === 'function') ? config.call(this, mid) : mid(config);
            if (middleware) this.app.use(middleware);
            this.debug(`${name} middleware is install success`);
        });
    }
    private initAfter(server: any) {
        let mailConfig = this.getConfig('nodemailer', 'service');
        let authors = this.package.author || [];
        let tos: Array<string> = [];
        authors.forEach((author: any) => {
            if (author.email) tos.push(author.email)
        });
        if (!tos.length) {
            this.logger.error('project package author must have email');
        }
        new ShutDown(server, {
            before: () => {
                return new Promise((reslove) => {
                    this.mail.sendMail({
                        from: `${mailConfig.auth.user}@${mailConfig.domain}`,
                        to: tos.join(','),
                        subject: `${this.name} server is shutdown!`,
                        text: `${this.name} server is shutdown in ${os.hostname()} at ${new Date().toLocaleString()}`
                    }, (err: any, msg: any) => {
                        if (err) {
                            this.logger.error(err.message)
                        }
                        reslove();
                    });
                    /*
                    if (NODE_ENV === 'production') this.emit('shuttdownAfter', reslove, reject);
                    else reslove();
                    */
                });
            },
            after: () => { // 关机后的处理函数
                this.emit('shuttdownAfter');
                this.debug('the server gracefull shutted down.')
            },
            errCb: (err: any) => { // 出现错误时的err回调，传入Error对象 
                this.logger.error(err.message);
            }
        })
    }
    run(port: number, cb: Function = this.noop) {
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
        let server = this.app.listen(port, cb);
        this.server = server;
        this.initAfter(server);
        this.debug(`${this.name} is listen on ${port}`);
    }
    private getExport(name: string, moduleType: string) {
        let mod = this.modules.globalModules[name] || this.modules[moduleType][name];
        if (mod && mod.export) return mod.export;
        return null;
    }
    private getConfig(name: string, moduleType: string) {
        let mod = this.modules.globalModules[name] || this.modules[moduleType][name];
        if (mod && mod.config) return mod.config;
        return null;
    }
    private setModule(name: string, moduleType: string, config: any, mod?: any) {
        if (!mod) {
            mod = config;
            config = undefined;
        }
        if (!this.modules[moduleType]) this.modules[moduleType] = {};
        this.modules[moduleType][name] = {
            export: mod
        };
        if (config) this.modules[moduleType][name].config = config;
        return this.modules[moduleType][name];
    }
    getService(name: string) {
        return this.getExport(name, 'service');
    }
    registerService(describe: serviceDes) {
        return this.setModule(describe.name, 'service', describe.config, describe.export);
    }
    registerMiddleware(describe: middlewareDes) {
        return this.setModule(describe.name, 'middleware', describe.config, describe.export);
    }
    registerMonitor(describe: monitorDes) {
        return this.setModule(describe.name, 'monitors', describe.config, describe.export);
    }
    getUtil(name: string) {
        return this.getExport(name, 'utils');
    }
    registerUtil(describe: utilDes) {
        return this.setModule(describe.name, 'utils', describe.export);
    }
}

module.exports = daruk;