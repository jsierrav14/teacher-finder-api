import {Router} from 'express'
import UserController from '../controllers/user'

const router = new Router();

const userController = new UserController();

router.post('/user/login',userController.login);
router.post('/user/create',userController.add);



export default router;