const mongoose = require('mongoose');

const { Schema } = mongoose;
const notesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

notesSchema.statics.getAllNotes = async () => {
  const notes = await this.find({});
  return notes;
};

notesSchema.statics.getNoteById = (noteId) => {
  const note = this.find({ _id: noteId });
  return note;
};

module.exports = mongoose.model('note', notesSchema);
