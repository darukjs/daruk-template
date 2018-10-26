import Daruk from '@sina/daruk'

const options = {
  authors: ['{{authorEmail}}'],
  // sina-watch提醒账号，填写邮箱前缀
  sinaWatchAccounts: [],
  debug: process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'production',
  // 开启异步调用追踪
  // https://www.npmjs.com/package/async-local-storage
  enableAls: false,
  // 开启监控路由
  enableMonitor: true,
  // 访问监控信息路由的认证信息
  auth: {
    name: 'test',
    password: '123'
  },
}

export default Daruk('myapp', options)