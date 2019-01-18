import '@sina/daruk'
import userInfo from '../../src/services/userInfo'

declare module '@sina/daruk' {
  interface Service {
    userInfo: userInfo
  }
}
