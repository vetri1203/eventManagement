import { MahalDetails } from "../Models/MahalDetails.js";

const NewSearch = async (req, res) => {
  const { date, district } = req.body;

  try {
    const availableMahals = await MahalDetails.find({
      district,
      unavailableDates: { $ne: new Date(date) },
    });

    if (availableMahals.length > 0) {
      res.json(availableMahals);
    } else {
      res.json({
        message: "No Mahals available for the selected date and district",
      });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default NewSearch;
