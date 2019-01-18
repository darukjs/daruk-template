import '@sina/daruk'
import userList from '../src/controllers/userList'

declare module '@sina/daruk' {
  interface Controller {
    userList: userList
  }
}
