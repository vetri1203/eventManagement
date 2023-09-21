


import { MahalDetails } from "../Models/MahalDetails.js";

export const AboutMahal = async (req, res) => {
  const id = req.body.id; 

  try {
    const filter = await MahalDetails.findOne({ Id: id });

    if (filter) {
      const response = {
        message: "Mahal Details",
        MahalDetails: filter,
      };
      return res.json(response.MahalDetails); 
    } else {
      return res.status(404).json({ message: "No Mahal Found" });
    }
  } catch (error) {
    console.error("Error while fetching Mahal:", error);
    return res.status(500).json({ message: "Error while fetching Mahal" });
  }
};
