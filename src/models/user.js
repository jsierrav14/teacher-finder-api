import mongoose from 'mongoose';
import { isEmail } from 'validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true
    },
    city:{
        type:String,
        required:true
    },
    teacher: {
        specialty:{
            type:String,
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
            address: {
                type: String,
            }
        },
    },
    student: {
        education:{
          type:String,
                
        },
        grade:{
            type:String,
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
    timestamps: true,
    toJSON: {
        virtuals:true,
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.tokens;
            delete ret.avatar;
        }
      }
    
})

userSchema.virtual('topics',{
    ref:'Topic',
    localField:'_id',
    foreignField:'owner'
})

userSchema.virtual('questions',{
    ref:'Question',
    localField:'_id',
    foreignField:'owner'
})

/*userSchema.methods.toJSON = function () {
//    const user = this;
  //  console.log('method',user)
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
}*/
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token })
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema)


export default User;