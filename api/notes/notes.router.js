const express = require('express');
const notesController = require('./notes.controller');

const router = express.Router();

router.get('/', async (_, res) => {
  const notes = await notesController.getAllNotes();
  res.json(notes);
});

router.get('/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const note = await notesController.getNoteById(noteId);
  res.json(note);
});

router.post('/', async (req, res) => {
  const note = req.body;
  const createdNote = await notesController.createNote(note);
  res.send(createdNote);
});

module.exports = router;
