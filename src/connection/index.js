import { connect } from 'mongoose';
import {conf} from './config'  
connect(conf.development, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    autoIndex:true
},(error,result)=>{
    if (error) {
        throw error;
    } else {
        console.log("Conexion correcta");
    }
})


