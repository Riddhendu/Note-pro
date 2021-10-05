const express = require("express");
const {
  getNotes,
  createNotes,
  getNotebyid,
  updateNotebyid,
  deleteNotebyid,
} = require("../controllers/noteController");
const protect = require("../Middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNotes);
router
  .route("/:id")
  .get(getNotebyid)
  .put(protect, updateNotebyid)
  .delete(protect, deleteNotebyid);
//.put().delete();

module.exports = router;
