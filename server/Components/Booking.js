import { MahalDetails } from "../Models/MahalDetails.js";
import { BookedMahals } from "../Models/BookedMahals.js";
const bookMahal = async (req, res) => {
  const { MahalId, UserName, SelectedDate,MahalName } = req.body;

  if (!MahalId || !UserName || !SelectedDate || !MahalName) {
    return res.status(400).json({ message: "Invalid request data." });
  }

  try {
    const mahal = await MahalDetails.findOneAndUpdate(
      { Id: MahalId }, // Use "Id" instead of "_id" if it's your actual field name
      { $push: { unavailableDates: new Date(SelectedDate) } },
      { new: true }
    );
    try {
      const addMahal = await new BookedMahals({
        MahalId:MahalId,
        MahalName: MahalName,
        UserName: UserName,
        Date:SelectedDate
      });
      console.log(addMahal);
      if (addMahal)
      {
        addMahal.save();
        console.log("Mahal add to booking db");
      }
      else {
        console.log("unable to add");
      }
       if (!mahal) {
         return res.status(404).json({ message: "Mahal not found." });
       }

       res.status(200).json({ message: "Booking successful." });
    }
    catch (e)
    {
      console.log("con't do this now");
    }

   
  } catch (error) {
    console.error("Error booking Mahal:", error);
    res.status(500).json({ message: "Booking failed. Please try again." });
  }
};

export default bookMahal;
