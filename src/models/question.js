import moongose from 'mongoose'

const questionSchema = new moongose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    }
})

const Question = mongoose.model('Question', questionSchema)