
import { MahalDetails } from "../Models/MahalDetails.js";

export const Search = async (req, res) => {
  try {
    const { Mahal } = req.body;

    const mahalRegex = new RegExp(Mahal, "i");

    if (Mahal.length === 0) {
      const finding = await MahalDetails.find({});
      const response = { 
        message: "All Mahal",
        MahalDetails: finding,
      };
      return res.json(response.MahalDetails);
    } else {
      const finding = await MahalDetails.find({ MahalName: mahalRegex });

      if (finding) {
        const response = {
          message: "Mahal",
          MahalDetails: finding,
        };
        res.json(response.MahalDetails);
      } else {
        res.json({ message: "No Mahal Found" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "Internal Server Error" });
  }
};
