//errHandle模块作用：将服务端所有的错误编码放入到一个文件中，方便维护


/**
 *  0:请求成功
 * 500：请求失败
 * 1000：登陆成功
 * 1001：用户或者密码错误
 * 1002：登陆失败
 * 2000：注册成功
 * 2001：邮箱已存在
 * 2002：注册失败
 * 9999：服务器维护中
 */

/**
 * code:错误码
 * err：错误对象
 * 返回值：json对象
 */

module.exports = function (code, err) {
  //  要返回json对象
  var errData;
  // 错误信息
  var message;

  switch (code) {
    case 0:
    message = '请求成功';
    break;
    case 500:
      message = err || '请求失败';
      break;
    case 1000:
      message = '登录成功';
      break;
    case 1001:
      message = '用户名或密码错误';
      break;
    case 2000:
      message = '注册成功';
      break;
    case 2001:
      message = '该邮箱已注册';
      break;
    case 9999:
      message = '服务器维护';
      break;

    default:
      message = '未知错误';
      break;
  }
  errData = {
    err_code : code,
    err_message: message
  }

  return errData;
}