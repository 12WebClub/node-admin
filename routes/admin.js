import  express from 'express';
import Admin from './../controller/admin/admin';
const router = express.Router();

router.post('/register', Admin.register);  // 注册
router.post('/login', Admin.login);        // 登录

export default router;
