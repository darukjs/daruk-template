import daruk from './daruk.init'

daruk.run(3000, () => {
  daruk.logger.info('服务已启动，访问 http://localhost:3000 查看效果')
})