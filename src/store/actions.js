/*
 * @Author: caiqin.xie
 * @since: 2020-01-13 09:54:13
 * @lastTime     : 2020-01-14 18:02:26
 * @LastEditors  : caiqin.xie
 * @message:
 */
import actionGcc from './actions/actionGcc'
import actionHfcm from './actions/actionHfcm'
import actionTx from './actions/actionTx'
const actions = {
  ...actionGcc,
  ...actionHfcm,
  ...actionTx
}

export default actions
