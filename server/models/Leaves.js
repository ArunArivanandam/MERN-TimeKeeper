import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LeaveRequestSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["Casual", "Earned"],
      required: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    leaveDate: {
      type: Date,
      default: () => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      },
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Leave date cannot be in the past",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("LeaveRequest", LeaveRequestSchema);
