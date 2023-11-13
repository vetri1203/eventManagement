import { UserSchema } from "../Models/LoginSchema.js";

// Import necessary modules and UserSchema...

export const UpdateUser = async (req, res) => {
    const { Mail } = req.body;

  try {
    if (!Mail) {
      return res.status(400).json({ error: 'Mail is required' });
    }

    const user = await UserSchema.findOne({ Email: Mail });

    if (user) {
      const data = {
        FirstName: user.FirstName,
        LastName: user.LastName,
        PhoneNumber: user.PhoneNumber,
      };
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server Error' });
  }
    
};

export const UpdatedUser = async (req, res) => {
  const {Mail, FirstName, LastName, PhoneNumber } = req.body;

  if (!FirstName || !LastName || !PhoneNumber) {
    return res.status(400).json({ error: 'Please enter all details' });
  }
  const user = await UserSchema.findOne({Email:Mail})
    user.FirstName = FirstName;
    user.LastName = LastName;
    user.PhoneNumber = PhoneNumber;

    user.save();
  console.log(user);
    return res.json(user);
};


