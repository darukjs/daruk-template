import { Daruk } from '@sina/daruk'

// @ts-ignore
const prod = process.env.NODE_ENV === 'prod' && process.env.NODE_ENV === 'production'

const options = {
  rootPath: __dirname,
  authors: ['{{authorEmail}}'],
  // sina-watch提醒账号，填写邮箱前缀
  sinaWatchAccounts: [],
  debug: !prod,
  // 开启异步调用追踪
  // https://www.npmjs.com/package/async-local-storage
  enableAls: false,
  // 开启v8 profiler 监控路由
  monitor: {
    enable: false,
    v8AnalyticsPath: '',
    v8ProfilerPath: '',
    // 访问监控信息路由的认证信息
    auth: {
      name: 'test',
      password: '123'
    }
  },
  logger: {
    level: prod ? 'info' : 'silly',
    logExt: {
      logType: '{{name}}'
    }
  }
}

export default new Daruk('{{name}}', options)