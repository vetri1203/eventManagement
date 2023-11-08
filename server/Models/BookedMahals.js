import mongoose from "mongoose";

const Booked = new mongoose.Schema({
    MahalName: {
        type: String
    },
    UserName: {
        type: String,
    },
    Date: {
        type: Date,
    }
},{
  timestamps: true
});


export const BookedMahals = new mongoose.model("Boked", Booked);
