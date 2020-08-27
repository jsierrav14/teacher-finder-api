import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'

    }
})

const Topic = mongoose.model('Topic', topicSchema)

export default Topic;