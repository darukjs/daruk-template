import daruk from './daruk.init'

const port = 3000
const host = '127.0.0.1'

daruk.run(port, host, () => {
  daruk.logger.info(`服务已启动，访问 http://${host}:3000 查看效果`)
})