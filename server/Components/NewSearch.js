import { MahalDetails } from "../Models/MahalDetails.js";

const NewSearch = async (req, res) => {
  const { district, date } = req.body;

  try {
    const availableMahals = await MahalDetails.find({
      district: district,
      date: date,
    });

    res.send(availableMahals)
    // console.log(availableMahals);
    // if (availableMahals.length > 0) {
    //   res.send(availableMahals);
    // } else {
    //   res.send("No Mahal");
    // }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default NewSearch;
