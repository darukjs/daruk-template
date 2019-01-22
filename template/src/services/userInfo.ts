/**
 * @author {{author}}
 * @description user services
 */

import { BaseService } from '@sina/daruk';

export default class MyService extends BaseService {
  getUserList() {
    const { mysql } = this.ctx.plugin;
    return mysql.queryUserList();
  }
}
