import express from "express";
import {
  getLeave,
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
} from "../../controllers/leaveController.js";
const router = express.Router();
import ROLES_LIST from "../../config/rolesList.js";
import verifyRoles from "../../middleware/verifyRoles.js";

router.route("/").get(getLeaves).post(createLeave);

router
  .route("/:id")
  .get(getLeave)
  .put(updateLeave)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteLeave);

export default router;
