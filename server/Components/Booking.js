import { MahalDetails } from "../Models/MahalDetails.js";

const bookMahal = async (req, res) => {
  const { MahalId, UserName, SelectedDate } = req.body;

  if (!MahalId || !UserName || !SelectedDate) {
    return res.status(400).json({ message: "Invalid request data." });
  }

  try {
    const mahal = await MahalDetails.findOneAndUpdate(
      { Id: MahalId }, // Use "Id" instead of "_id" if it's your actual field name
      { $push: { unavailableDates: new Date(SelectedDate) } },
      { new: true }
    );

    if (!mahal) {
      return res.status(404).json({ message: "Mahal not found." });
    }

    res.status(200).json({ message: "Booking successful." });
  } catch (error) {
    console.error("Error booking Mahal:", error);
    res.status(500).json({ message: "Booking failed. Please try again." });
  }
};

export default bookMahal;
