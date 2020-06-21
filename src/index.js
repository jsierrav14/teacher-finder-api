import "babel-polyfill"
import '../connection/index';
import express,{json} from 'express'
import teacherRouter  from './routes/teacher'
import topicRouter from './routes/topic'

const app = express();

const port = process.env.PORT;


app.use(json());
app.use(teacherRouter)
app.use(topicRouter);

app.listen(port,()=>{
  console.log('Server is up in port '+ port);
})