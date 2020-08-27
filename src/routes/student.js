import {Router} from 'express'
import StudentController from '../controllers/student'
import {auth} from '../middleware/auth'


const router = new Router();
const studentController = new StudentController();  
router.get('/students',studentController.getAllStudent);
router.patch('/student/me',auth,studentController.updateStudent)

export default router;