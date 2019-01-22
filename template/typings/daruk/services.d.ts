import '@sina/daruk';
import UserInfo from '../../src/services/UserInfo';

declare module '@sina/daruk' {
  interface Service {
    UserInfo: UserInfo;
  }
}
