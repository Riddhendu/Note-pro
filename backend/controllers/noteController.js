const asyncHandler = require("express-async-handler");
const Note = require("../Model/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !category || !content) {
    res.status(400);
    throw new Error("notes already exist");
  } else {
    const note = new Note({
      user: req.user._id,
      title,
      category,
      content,
    });
    const createNote = await note.save();
    res.status(201).json(createNote);
  }
});

const getNotebyid = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const updateNotebyid = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  const note = await Note.findByIdAndUpdate(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("yo can't perform the task");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const updateNote = await note.save();
    res.json(updateNote);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

const deleteNotebyid = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

module.exports = {
  getNotes,
  createNotes,
  getNotebyid,
  updateNotebyid,
  deleteNotebyid,
};
