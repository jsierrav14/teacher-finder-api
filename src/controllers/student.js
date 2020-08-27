import User from '../models/user'

class StudentController {


    async updateStudent(req, res){

        const updates = Object.keys(req.body)
        const alloweUpdates = ['firstName','lastName','email','password','type', 'student']
        const isValidOperation = updates.every((update)=>alloweUpdates.includes(update));
        if(!isValidOperation){
            return res.status(400).send('Invalid update')
        }
 
        
        try{
            updates.forEach(update => req.user[update] = req.body[update])
            await req.user.save();

            res.status(200).send("User was edit with sucessfully")
        }catch(error){
             res.status(400).send(error)
        }
     
    }
    async getAllStudent(req,res){

        const sort={}
        let filter ={ type: 'Student'}


        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':');
            sort[parts[0]]=parts[1]==='desc' ? -1 :1
        }

        if(req.query.city){
            filter['city'] = req.query.city;
        }

        try{

            let results = await User.find(filter,null,{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }).exec();

            res.status(200).send(results)

        }catch(error){
            res.status(500).send(error)

        }

        
    }


}

export default StudentController;