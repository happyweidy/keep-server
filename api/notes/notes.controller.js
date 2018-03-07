const NoteModel = require('./notes.model');

const getAllNotes = async () => {
  const notes = await NoteModel.find({}).exec();
  return notes;
};

const getNoteById = async (noteId) => {
  const note = await NoteModel.find({ _id: noteId }).exec();
  return note;
};

const createNote = async (note) => {
  const newNote = new NoteModel(note);
  const createdNote = await newNote.save();
  return createdNote;
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
};
