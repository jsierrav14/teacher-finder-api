import { connect } from 'mongoose';

connect(process.env.MONGO_DB, {
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


