import '@sina/daruk'
import mysql from '../src/plugins/mysql/index'

declare module '@sina/daruk' {
  interface Plugin {
    mysql: ReturnType<typeof mysql>
  }
}
