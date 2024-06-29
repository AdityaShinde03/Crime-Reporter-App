import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    number :{
        type: String,
        required: [true, 'Number is required'],
        unique: true,
        trim: true,
        minlength: [10, 'Number must be at least 10 characters long'],
        maxlength: [10, 'Number cannot exceed 10 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    role: {
        type: String,
        enum: ['Citizen', 'Police',"Admin"],
        default: 'Citizen',
    }

});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;