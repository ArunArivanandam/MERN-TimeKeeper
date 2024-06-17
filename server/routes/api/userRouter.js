import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../../controllers/userController.js";
import verifyJWT from "../../middleware/verifyJWT.js";

const router = express.Router();

router.route("/").get(verifyJWT, getUsers);

router
  .route("/:id")
  .get(verifyJWT, getUser)
  .put(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);

export default router;
