import { BookedMahals } from "../Models/BookedMahals.js";

export const Booking = async (req, res) => {
   try {
     const { MahalName, UserName, Date } = req.body;

     // Create a new booking record
     const booking = new BookedMahals({
       MahalName,
       UserName,
       Date,
     });

     // Save the booking to the database
     const result = await booking.save();

     res
       .status(201)
       .json({ message: "Mahal booked successfully", booking: result });
   } catch (error) {
     console.error("Error booking Mahal:", error);
     res.status(500).json({ message: "Internal server error" });
   }
}