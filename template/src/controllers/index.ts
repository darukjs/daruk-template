import { Daruk, Context } from '@sina/daruk'

module.exports = function (daruk:Daruk) {
  daruk.registerController({
    name: 'userListController',
    export: function () {
      return async function (ctx:Context) {
        ctx.body = 'user list'
      }
    }
  })
}
