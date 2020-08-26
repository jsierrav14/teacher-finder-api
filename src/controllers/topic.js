import Topic from '../models/topic'


class TopicController {

    async add(req, res){
      
        const topic = new Topic(
        {
            ...req.body,
            owner:req.user._id
        });
        try{
         await topic.save();
         res.status(201).send({topic})
        }catch(e){
          res.status(500).send({e})
        }
    }

    async getAll(req,res){
        const math = {}
        const sort = {}

        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':');
            sort[parts[0]]=parts[1]==='desc' ? -1 : 1;

        }

        try {
            
        await req.user.populate({
            path:'topics',
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort:sort
            }
        }).execPopulate();

        res.status(200).send(req.user.topics)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

}

export default TopicController;