const jwt = require('jsonwebtoken');

const home = (req, res, next) => {
  const token = req.query.token;
  
  jwt.verify(token, 'nodejs', (err, decode) => {
    if (err) {
      //  时间失效的时候/ 伪造的token
      res.send({
        code: 12000,
        status: 'error',
        message: '登录失效，请重新登录！',
      });
    } else {
      res.send({
        code: 200,
        status: 'success',
        message: '登录成功！',
      });
    }
  })
}

export default {
  home,
};