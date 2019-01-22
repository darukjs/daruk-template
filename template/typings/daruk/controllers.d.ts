import '@sina/daruk';
import UserList from '../../src/controllers/UserList';

declare module '@sina/daruk' {
  interface Controller {
    UserList: UserList;
  }
}
