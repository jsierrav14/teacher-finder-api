import {Router} from 'express'
import TeacherController from '../controllers/teacher'
import {auth} from '../middleware/auth'


const router = new Router();
const teacherController = new TeacherController();
router.get('/teachers',teacherController.getAllTeacher);
router.patch('/teacher/me',auth,teacherController.updateTeacher)

export default router;