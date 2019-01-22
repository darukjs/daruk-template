import { expect } from 'chai';
import daruk from '../../src/app';

daruk.logger.options.disable = true;
const { UserInfo } = daruk.context.service;

describe('test for service', () => {
  describe('test for UserInfo', () => {
    it('should get UserInfo.getUserList data', (done) => {
      UserInfo.getUserList().then((val) => {
        expect(val[0]).to.equal('user1');
        expect(val[1]).to.equal('user2');
        done();
      });
    });
  });
});
