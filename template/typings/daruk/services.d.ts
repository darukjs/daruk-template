import '@sina/daruk';
import UserInfo from '../../src/services/userInfo';

declare module '@sina/daruk' {
  interface Service {
    UserInfo: UserInfo;
  }
}
