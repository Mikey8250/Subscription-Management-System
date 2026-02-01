import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User name is required'],
            trim: true,
            minLength: 2,
            maxLength: 50,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 16        
        },
    }, {timeStamps: true}
)

const User = mongoose.model('User', userSchema)


export default User