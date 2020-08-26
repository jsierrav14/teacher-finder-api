import moongose from 'mongoose'

const questionSchema = new moongose.Schema({
    topic:{
      type:'String',
      required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Teacher'

    }
})

const Question = mongoose.model('Question', questionSchema)

export default Question;