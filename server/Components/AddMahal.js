// import { MahalDetails } from "../Models/MahalDetails.js";
// import multer from 'multer'

// export const AddMahal = async(req,res)=>{
//     // res.send('ok');

//     const {MahalName,NumberOfSeat,Images,Rooms,MahalType}=req.body;

//     const storage = multer.diskStorage({
//         destination:'mahal Images',
//         filename:(req,file,call)=>{
//             call(null,file.originalname);
//         },
//     });
//     const upload = multer({
//         storage:storage
//     }).single('Images');

//     upload(req,res,async(err)=>{
//         if(err)
//         {
//             return   res.send("Error",err);
//         }
//         try {
//             const newData = new MahalDetails({
//                 MahalName:req.body.MahalName,
//                 NumberOfSeat:req.body.NumberOfSeat,
//                 Rooms:req.body.Rooms,
//                 MahalType:req.body.MahalType,
//                 // Images:{data:req.file.buffer}
//             });

//             const saveData = await newData.save();
//             res.send(saveData)
//         } catch (error) {
//             res.send("error in save data...")
//         }

//     })
// }
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
    const { MahalName, NumberOfSeat, Rooms, MahalType } = req.body;

    if (!MahalName || !NumberOfSeat || !Rooms || !MahalType) {
      return res.status(400).send("Please provide all required fields.");
    }   

    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).send("Error uploading image.");
      }

      try {
        const newMahal = new MahalDetails({
          MahalName: MahalName,
          NumberOfSeat: NumberOfSeat, 
          Rooms: Rooms,
          MahalType: MahalType,
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
