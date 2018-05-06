import chai from 'chai';
import util from '../util';

const assert = chai.assert;
it('validateEmail - 無効なemailがfalseと判断されること', () => {
  assert.isFalse(util.validateEmail('invaid.email'));
});
it('validateEmail - 有効なemailがtrueと判断されること', () => {
    assert.isTrue(util.validateEmail('vaid@email.com'));
  });