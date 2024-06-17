import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import userRoutes from "./routes/api/userRouter.js";
import leaveRoutes from "./routes/api/leaveRouter.js";
import registerRoute from "./routes/register.js";
import authRoute from "./routes/auth.js";
import refreshRoute from "./routes/refresh.js";
import logoutRoute from "./routes/logout.js";
import credentials from "./middleware/credentials.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(credentials);

//middleware for cookies
app.use(cookieParser());

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("hello from express!!!");
});

app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);

//API routes
app.use("/leaves", leaveRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
