const jwt = require('jsonwebtoken');
import db from '../../utils/dbCommon'

/**
 * 注册
 * @param req
 * @param res
 * @param next
 */
const register = (req, res, next) => {
// 查找用户
  var selectSql = "select * from userinfo where username = '"+ req.body.username + "'";
  db.query(selectSql, async (err, rows, fields) => {
    if (err) {
      return console.error(err);
    }
    if (rows.length > 0) {
      res.send({
        code: 500,
        status: 'error',
        message: '用户名已存在！',
      });
    } else {
      const username = req.body.username;
      const password = req.body.password;
      let gender;
      req.body.gender ? gender = req.body.gender : gender = 0;
      const age = req.body.age;
      console.log('register ---')
      
      // 新增用户sql
      const addSql = "INSERT INTO `userinfo` (`username`, `password`, `gender`, `age`) VALUES ('" + username + "', '"+ password +"', '" + gender + "', '" + age + "')";
  
      db.query(addSql, function(err, rows, fields) {
        if (err) {
          res.send({
            code: 500,
            status: 'error',
            message: '添加失败！'
          });
        } else {
          res.send({
            code: 200,
            status: 'success',
            message: '添加成功！',
          });
        }
      });
    }
  });
}

/**
 * 登录
 * @param req
 * @param res
 * @param next
 */
const login = (req, res, next) =>{
  var username = req.body.username;
  var password = req.body.password;
  
  // 查找用户
  var selectSql = "select * from userinfo where username = '"+ username +"'";
  db.query(selectSql, (err, rows, fields) => {
    if (err) {
      return console.error(err);
    }
    console.log('login ---')
    if (rows.length > 0) {
      if (rows.length === 1) {
        if(rows[0].password === password) {
          // 生成token
          const token = jwt.sign({
              name: rows[0].username
            },'nodejs' // 随便一点内容，撒盐：加密的时候混淆
            ,{
              expiresIn: 86400 //60秒到期时间
            });
          
          res.send({
            code: 200,
            status: 'success',
            token: token,
            message: '登录成功！',
          });
        } else {
          res.send({
            code: 500,
            status: 'error',
            message: '密码错误！',
          });
        }
      } else {
        res.send({
          code: 500,
          status: 'error',
          message: '存在多个用户，请删除！',
        });
      }
    } else {
      res.send({
        code: 500,
        status: 'error',
        message: '用户不存在！',
      });
    }
  });
};

export default {
  register,
  login,
};