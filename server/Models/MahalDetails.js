import mongoose from "mongoose";

const Mahal = new mongoose.Schema(
  {
    Id: {
      type: String,
    },
    MahalName: {
      type: String,
      require: true,
    },
    NumberOfSeat: {
      type: Number,
      require: true,
    },
    Place: {
      type: String,
      require: true,
    },
    Amount: {
      type: Number,
      require: true,
    },
    Images: {
      type: Buffer,
      contentType: String,
    },
    Rooms: {
      type: Number,
      require: true,
    },
    MahalType: {
      type: String,
      require: true,
    },
    Parking: {
      type: Number,
      require: true,
    },
    About: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      // required: true,
    },
    unavailableDates: [{ type: Date }],
  },
  { timestamps: true }
);

export const MahalDetails = new mongoose.model("Mahals", Mahal);
