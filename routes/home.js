import  express from 'express';
import Home from './../controller/home/home';
const router = express.Router();

router.get('/', Home.home);  // 首页

export default router;
