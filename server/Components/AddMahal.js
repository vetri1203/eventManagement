import { MahalDetails } from "../Models/MahalDetails.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "mahalImages",
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("Images");

export const AddMahal = async (req, res) => {
  try {
    const {
      MahalName,
      NumberOfSeat,
      Rooms,
      MahalType,
      Amount,
      Place,
      Parking,
      About,
    } = req.body;

    if (
      !MahalName ||
      !NumberOfSeat ||
      !Rooms ||
      !MahalType ||
      !Amount ||
      !Place ||
      !Parking ||
      !About
    ) {
      return res.status(400).send("Please provide all required fields.");
    }

    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send("Error uploading image.");
      }

      try {
        const date = new Date();
        const id = date;
        const newMahal = new MahalDetails({
          MahalName: MahalName,
          NumberOfSeat: NumberOfSeat,
          Rooms: Rooms,
          MahalType: MahalType,
          Amount: Amount,
          Parking: Parking, 
          Place: Place,
          Id: id,
          About: About,
          //   Images:{data:req.file.buffer}
        });

        const savedMahal = await newMahal.save();
        res.status(201).json(savedMahal);
      } catch (error) {
        console.error("Error saving MahalDetails:", error);
        res.status(500).send("Error in saving data.");
      }
    });
  } catch (error) {
    console.error("Error in AddMahal:", error);
    res.status(500).send("Server error.");
  }
};
