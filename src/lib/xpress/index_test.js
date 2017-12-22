/**
 * @author cyb
 * @copyright cyb.com
 * @desc
 */

const x = async function () {
  return 1
};

describe('#x', function () {
  it('case x', async function () {
    let c = await x();
  });
});