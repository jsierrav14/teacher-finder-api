import Teacher from '../models/teacher'

class TeacherController {

    async add(req, res) {
        const teacher = new Teacher(req.body);

        try {

            await teacher.save();
            const token = await teacher.generateAuthToken();
            res.status(201).send({teacher,token})

        } catch (e) {
            res.status(400).send(e);
        }

    }

    async updateTeacher(req, res){
        const updates = Object.keys(req.body);
        const alloweUpdates = ['name', 'email', 'password', 'age', 'location'];
        const isValidOperation = updates.every((update) => alloweUpdates.includes(update))
        if (!isValidOperation) {
            return res.status(400).send('Invalid update')
        }
        try {
            updates.forEach(update => req.teacher[update] = req.body[update])
            await req.teacher.save();
        } catch (e) {
           
        }
    }
    async login(req,res){
        try{
         const teacher = await Teacher.findByCredentials(req.body.email,req.body.password)
         const token = await teacher.generateAuthToken();
         res.status(201).send({teacher,token})
        }catch(e){
            res.status(400).send(e)
        }
    }


}

export default TeacherController;