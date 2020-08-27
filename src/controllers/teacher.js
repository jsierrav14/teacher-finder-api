import User from '../models/user'

class TeacherController {

    async addTeacher(req, res) {
        const teacher = new User(req.body);

        try {

            await teacher.save();
            const token = await teacher.generateAuthToken();
            res.status(201).send({ user: teacher, token })

        } catch (e) {
            res.status(400).send(e);
        }

    }

    async updateTeacher(req, res) {
        const updates = Object.keys(req.body);
        const alloweUpdates = ['firstName', 'lastName', 'email', 'password', 'type', 'city', 'teacher'];
        const isValidOperation = updates.every((update) => alloweUpdates.includes(update))
        if (!isValidOperation) {
            return res.status(400).send('Invalid update')
        }
        try {
            updates.forEach(update => req.user[update] = req.body[update])
            await req.user.save();

            res.status(200).send("User was edit with successfully")
        } catch (e) {
            res.status(400).send({ e });
        }
    }
    async getAllTeacher(req, res) {
        const math = {}
        const sort = {}
        const regex= req.query.specialty;
        let  filter ={ type: 'Teacher'}

        if(req.query.specialty){
            filter['teacher.specialty']={ $regex: new RegExp(regex), $options: 'i' }
        }

        console.log(filter)
        
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;

        }
        
        try {

            let results = await User.find(filter, null, {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }).populate({path:'topics'}).exec()
            res.status(200).send(results)

        } catch (error) {
            res.status(500).send(error)
        }

    }



}

export default TeacherController;