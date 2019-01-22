/**
 * @author {{author}}
 * @description user controllers
 */

import { BaseController } from '@sina/daruk';

export default class userListController extends BaseController {
  async index() {
    const { UserInfo } = this.ctx.service;
    const { sort } = this.ctx.util;
    const list = await UserInfo.getUserList();
    this.ctx.body = sort(list);
  }
}
