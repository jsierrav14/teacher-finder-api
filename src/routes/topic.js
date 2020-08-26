import {Router} from 'express'
import {auth} from '../middleware/auth'
import TopicController from '../controllers/topic'

const router = new Router();
const topicController = new TopicController();
router.post('/topic', auth,topicController.add)
router.get('/topics', auth, topicController.getAll)

export default router;