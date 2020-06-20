import {Router} from 'express'
import TeacherController from '../controllers/teacher'



const router = new Router();
const teacherController = new TeacherController();


router.post('/teacher',teacherController.add);

export default router;