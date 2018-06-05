/**
 * 封装 输出`send`格式
 * @type {{}}
 */
function send(res, code, status, message, data) {
  res.send({
    code: code,
    status: status,
    message: message,
    data: data ? data : [],
  });
}

module.exports = send;