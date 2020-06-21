import {Router} from 'express'
import TeacherController from '../controllers/teacher'
import {authTeacher} from '../middleware/auth'


const router = new Router();
const teacherController = new TeacherController();

router.post('/teacher/login',teacherController.login)
router.post('/teacher',teacherController.add);
router.patch('/teacher/me',authTeacher,teacherController.updateTeacher)
export default router;