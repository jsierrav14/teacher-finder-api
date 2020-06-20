import "babel-polyfill"
import express,{json} from 'express'

const app = express();

const port = process.env.PORT;


app.use(json());

app.listen(port,()=>{
  console.log('Server is up in port'+ port);
})