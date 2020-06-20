import moongose from 'mongoose'

const topicSchema = new moongose.Schema({
    name:{
        type:String,
        required:true
    }
})

const Topic = mongoose.model('Topic', topicSchema)

export default Topic;