import User from '../models/user'


export default class UserController {


    async add(req, res) {
        const user = new User(req.body);

        console.log(user)
        try {

            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token })

        } catch (e) {
            res.status(400).send(e);
        }
    }

    async login(req, res) {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token })
        } catch (e) {
            res.status(400).send(e)
        }
    }



}
