import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    leaveBalance: {
      casualLeave: {
        type: Number,
        default: 12,
      },
      earnedLeave: {
        type: Number,
        default: 0,
      },
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
