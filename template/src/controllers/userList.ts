/**
 * @author {{author}}
 * @description user controllers
 */

import { BaseController } from '@sina/daruk'

export default class userListController extends BaseController {
  async index () {
    const { userInfo } = this.ctx.service
    const { sort } = this.ctx.util
    const list = await userInfo.getUserList()
    this.ctx.body = sort(list)
  }
}
