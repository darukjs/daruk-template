/**
 * 全局配置
 */
import path from 'path'
import { Daruk } from '@sina/daruk'

export default function (daruk:Daruk) {
  const { rootPath } = daruk.options

  const darukConfig:any = {}

  darukConfig.middlewareOrder = [
		'koa-handle-error',
		'koa-favicon',
		'koa-static',
		'koa-bodyparser',
    'koa-ejs']
  darukConfig.middleware = {
		//https://github.com/axross/koa-handle-error 必须第一个位置
    'koa-handle-error': function (mid: Function) {
			return mid((err: any) => { console.log(err); })
    },
    'koa-favicon': function (mid: Function) {
			return mid(`${rootPath}/public/favicon.ico`);
    },
		//https://github.com/koajs/bodyparser
    'koa-bodyparser': function (mid: Function) {
			return mid();
    },
		//https://github.com/PaulRosset/formidable-upload-koa
    'formidable-upload-koa': function (mid: Function) {
			return mid({ uploadDir: `${rootPath}`, keepExtensions: true })
    },
		//https://github.com/venables/koa-json-body
    'koa-json-body': function (mid: Function) {
      return mid()
    },
    //https://github.com/koajs/json
    'koa-json': function (mid: Function) {
      return mid()
    },
    //https://github.com/zadzbw/koa2-cors
    'koa2-cors': function (mid: Function) {
      return mid({
        "allowMethods": ['GET', 'POST', 'DELETE']
      })
    },
    //https://github.com/vagusX/koa-proxies
    'koa-proxies': function (mid: Function) {
			//代理需要自己配置，默认不配置代码
			return false;
    },
		//https://github.com/nswbmw/koa-ip
    'koa-ip': function (mid: Function) {
			return false; //默认没有配置
			//return mid({
			//	blacklist: [],
			//	handler: async (ctx: any) => {
			//		ctx.status = 403;
			//	}
			//});
    },
    //https://github.com/koajs/static
		'koa-static': function (mid: Function) {
			return mid(path.join(rootPath, './public'));
    },
    //https://github.com/kilianc/koa-jsonp post支持iframe,默认参数callback
		'koa-jsonp': function (mid: Function) {
      return mid()
    },
		//https://github.com/koajs/compress
		'koa-compress': function (mid: Function) {
      return mid({
        threshold: 1024,
        flush: require('zlib').Z_SYNC_FLUSH
      })
    },
		//https://github.com/koajs/session
		'koa-session': function (mid: Function) {
			return mid({
				key: 'koa:session'
			}, this.app);
		},
		//https://github.com/ifraixedes/node-koa-flash-simple
		'koa-flash-simple':function (mid: Function) {
      return mid()
    },
		//https://github.com/koajs/ejs
		'koa-ejs': function (mid: Function) {
			mid(daruk, {
				root: path.join(rootPath, './view'),
				viewExt: 'html',
				cache: true,
				debug: false
			});
			return false;
		},
		//https://github.com/rferro/koa-body-clean
		'koa-body-clean': function (mid: Function) {
      return mid({
        threshold: 1024,
        flush: require('zlib').Z_SYNC_FLUSH
      })
    }
  }
  darukConfig.util = {
		"testUtil": function () {},
  }
  darukConfig.timer = {
    testTimer: {
      cronTime: '* * * * * *', // 一秒一次
      onTick: function (this: any) {
        this.stop() //  主动停止定时器
      },
      onComplete: function () {} // 定时器完成时的回调
    }
  }

  return darukConfig
}
