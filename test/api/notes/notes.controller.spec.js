const should = require('should');
const mongoose = require('mongoose');
const { mongodb } = require('../../../config');

const { getAllNotes, getNoteById, createNote } = require('../../../api/notes/notes.controller');

let createdNote;

describe('Notes Controller', () => {
  before(() => {
    mongoose.connect(mongodb.mongodbUrl);
  });

  it('`createNote` should create a new note', async () => {
    createdNote = await createNote({ title: 'This is a test note', body: 'This is the body' });
    should.exist(createdNote);
  });

  it('`getAllNotes` should get all the notes', async () => {
    const notes = await getAllNotes();
    should.exist(notes);
    notes.should.be.an.instanceOf(Array);
    notes[0].should.have.properties(['_id', 'title', 'body', 'createdAt']);
  });

  it('`getNoteById` should get the note by its id', async () => {
    const [note] = await getNoteById(createdNote._id.toString());
    should.exist(note);
    note.should.be.an.instanceOf(Object);
    note.should.have.properties(['_id', 'title', 'body', 'createdAt']);
  });

  after(async () => {
    await mongoose.connection.db.dropDatabase('keep');
    await mongoose.connection.close();
  });
});
