import User from "../models/User.js";
import jwt from "jsonwebtoken";

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required.",
      });
    }

    // check for duplicate usernames in the db
    const inputPasswordDate = new Date(password);
    if (isNaN(inputPasswordDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // evaluate password
    const match = foundUser.password.getTime() === inputPasswordDate.getTime();
    if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean);

      //JWT implementation
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      //saving refresh token with current user
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send authorization roles and access token to user
      return res.json({ roles, accessToken });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handleLogin;
