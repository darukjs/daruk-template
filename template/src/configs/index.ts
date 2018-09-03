/**
 * 定义所有框架自带能力的配置
 */
const path = require('path');

const globalConfig: any = {
	globalModules: {
		"node-rdkafka": {
			install: false,
			config: {}
		},
	},
	service: {
		"ioredis": {},
		"sequelize": {},
		"mysql": {},
		"request": {},
		"nodemailer": {
			debug: true,
			host: 'smtp.sina.com',
			secureConnection: true,
			auth: {
				user: 'fedvip',
				pass: '1234qwerasdfzxcv'
			},
			domain: 'sina.com'
		}
	},
	middleware: {
		//https://github.com/axross/koa-handle-error 必须第一个位置
		"koa-handle-error": function (mid: Function) {
			return mid((err: any) => { console.error(err); });
		},
		"koa-favicon": function (mid: Function) {
			return mid(`${this.root}/public/favicon.ico`);
		},
		//https://github.com/koajs/bodyparser
		"koa-bodyparser": {},
		//https://github.com/PaulRosset/formidable-upload-koa
		"formidable-upload-koa": function (mid: Function) {
			return mid({ uploadDir: `${this.root}`, keepExtensions: true })
		},
		//https://github.com/venables/koa-json-body
		"koa-json-body": {},
		//https://github.com/koajs/json	
		"koa-json": {},
		//https://github.com/zadzbw/koa2-cors
		"koa2-cors": {
			allowMethods: ['GET', 'POST', 'DELETE'],
		},
		//https://github.com/vagusX/koa-proxies
		"koa-proxies": function (mid: Function) {
			//代理需要自己配置，默认不配置代码
			return false;
		},
		//https://github.com/nswbmw/koa-ip
		"koa-ip": function (mid: Function) {
			return false; //默认没有配置
			/*
			return mid({
				blacklist: [],
				handler: async (ctx: any) => {
					ctx.status = 403;
				}
			});
			*/
		},
		//https://github.com/koajs/static
		"koa-static": function (mid: Function) {
			return mid(path.join(this.root, './public'));
		},
		//https://github.com/kilianc/koa-jsonp post支持iframe,默认参数callback
		"koa-jsonp": {},
		//https://github.com/koajs/compress
		"koa-compress": {
			threshold: 1024,
			flush: require('zlib').Z_SYNC_FLUSH
		},
		//https://github.com/koajs/session
		"koa-session": function (mid: Function) {
			return mid({
				key: 'koa:session'
			}, this.app);
		},
		//https://github.com/ifraixedes/node-koa-flash-simple
		"koa-flash-simple": {},
		//https://github.com/koajs/ejs
		"koa-ejs": function (mid: Function) {
			mid(this.app, {
				root: path.join(this.root, './view'),
				viewExt: 'html',
				cache: true,
				debug: false
			});
			return false;
		},
		//https://github.com/rferro/koa-body-clean
		"koa-body-clean": {}
	},
	utils: {
		"lodash": {},
		"lru-cache": {}
	},
	monitors: {

	}
};

export {
	globalConfig
}
