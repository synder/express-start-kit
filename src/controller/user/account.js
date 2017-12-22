/**
 * @author 
 * @copyright
 * @desc
 */

import * as userAccountModel from '../../model/user/account';

export async function home(req, res, next) {
  
  let x = await userAccountModel.findUserByName();
  
  res.json({
    code: '0000',
    msg: '',
    payload: {
      ok: x,
    }
  });
}
