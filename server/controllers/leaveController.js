import LeaveRequest from "../models/Leaves.js";

const getLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({});
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLeave = async (req, res) => {
  try {
    const newLeave = await LeaveRequest.create(req.body);
    res.status(200).json(newLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveRequest.findById(id);
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveRequest.findByIdAndUpdate(id, req.body);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    const updatedLeave = await LeaveRequest.findById(id);
    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveRequest.findByIdAndDelete(id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (error) {
    res.status(500).json({ messge: error.message });
  }
};

export { getLeaves, createLeave, updateLeave, deleteLeave, getLeave };
