import "babel-polyfill"
import '../connection/index';
import express, { json } from 'express'
import teacherRouter from './routes/teacher'
import topicRouter from './routes/topic'
import userRouter from './routes/user'

const app = express();

const port = process.env.PORT;
app.use(json());
app.use(teacherRouter)
app.use(topicRouter);
app.use(userRouter)

app.listen(port, () => {
  console.log('Server is up in port ' + port);
})