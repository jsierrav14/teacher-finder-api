import mongoose from 'mongoose';
import { isEmail } from 'validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }

    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password word')
            }
        }

    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }

}, {
    timestamps: true
})


teacherSchema.methods.generateAuthToken = async function(){
    const teacher = this;
    const token = jwt.sign({_id:teacher._id.toString()}, process.env.JWT_KEY);
    teacher.tokens = teacher.tokens.concat({token})
    
    await teacher.save();
    
    return token;
}

teacherSchema.statics.findByCredentials = async(email, password)=>{
    const teacher = await Teacher.findOne({email:email})
    if(!teacher){
        throw new Error('Unable to login')
    }
    const isMatch = bcrypt.compare(password, teacher.password)

    if(!isMatch){
        throw new Error('unable to login')
    }

    return teacher;
}

teacherSchema.pre('save', async function(next){
    const teacher = this;
    if(teacher.isModified){
        teacher.password = await bcrypt.hash(teacher.password,8);
    }

    next();
})

const Teacher = mongoose.model('Teacher', teacherSchema)

export default Teacher;