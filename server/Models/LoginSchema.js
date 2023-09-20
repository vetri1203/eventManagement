import mongoose from "mongoose";


const Login = mongoose.Schema({
    FirstName:{
        type:String,
        require:true
    },
    LastName:{
        type:String,
        require:true
    },
    PhoneNumber:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    }
},{ timestamps: true });


export const UserSchema = mongoose.model('userDatas',Login);