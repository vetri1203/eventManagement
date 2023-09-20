import mongoose from "mongoose";


const Mahal = new mongoose.Schema({
    MahalName : {
        type:String,
        require:true
    },
    NumberOfSeat : {
        type:Number,
        require:true
    },
    Images:{
        type:Buffer,
        contentType:String,
    },
    Rooms : {
        type:Number,
        require:true,

    },
    MahalType:{
        type:String,
        require:true
    }
},{timestamps:true});

export const MahalDetails = new mongoose.model('Mahals',Mahal);