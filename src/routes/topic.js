import {Router} from 'express'
import {authTeacher} from '../middleware/auth'
import TopicController from '../controllers/topic'

const router = new Router();
const topicController = new TopicController();
router.post('/topic', authTeacher,topicController.add)
router.get('/topics', authTeacher, topicController.getAll)


export default router;