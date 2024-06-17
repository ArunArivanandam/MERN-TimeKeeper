import User from "../models/User.js";

const handleNewUser = async (req, res) => {
  const { name, username, password, phoneNumber } = req.body;
  if (!name || !username || !password || !phoneNumber)
    return res.status(400).json({
      message: "name, username, password and phone number are required.",
    });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //create and store the new user
    const result = await User.create({
      name: name,
      username: username,
      password: password,
      phoneNumber: phoneNumber,
    });

    res.status(201).json({ success: `New user ${name} created!` });
    console.log(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handleNewUser;
