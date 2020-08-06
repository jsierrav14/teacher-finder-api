import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Teacher'

    }
})

const Topic = mongoose.model('Topic', topicSchema)

export default Topic;