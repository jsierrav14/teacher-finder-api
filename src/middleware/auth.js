import jwt from 'jsonwebtoken'
import Teacher from '../models/teacher'

export const authTeacher =  async(req,res,next)=>{


    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_KEY)
        const user = await Teacher.findOne({_id:decode._id,'tokens.token':token});

        if(!user){
            throw new Error();
        }
        req.token =token;
        req.teacher = user;
        next();

    }catch(e){
        res.status(401).send({ 'error': 'Please authenticated'})
    }


}