import "babel-polyfill"
import '../connection/index';
import express,{json} from 'express'
import teacherRouter  from './routes/teacher'


const app = express();

const port = process.env.PORT;


app.use(json());
app.use(teacherRouter)

app.listen(port,()=>{
  console.log('Server is up in port '+ port);
})