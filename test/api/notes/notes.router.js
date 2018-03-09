const should = require('should');
const express = require('express');
const request = require('supertest');
const proxyquire = require('proxyquire');
const bodyParser = require('body-parser');

const app = express();
const mockNotes = require('../data/notes');

const notesRoute = proxyquire('../../../api/notes/notes.router', {
  './notes.controller': {
    getAllNotes: () => Promise.resolve(mockNotes),
    getNoteById: noteId => Promise.resolve(mockNotes.find(note => note._id === noteId)),
    createNote: note => Promise.resolve(Object.assign({}, note, { _id: '5a9ebdf96162ed55c3072344', createdAt: Date.now() })),
  },
});

describe('Note Routes', () => {
  before(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/notes', notesRoute);
  });

  it('should be able to get all the notes', (done) => {
    request(app)
      .get('/notes')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res.body);
        res.body.should.be.an.instanceOf(Array);
        const [noteSample] = res.body;
        noteSample.should.have.only.keys('title', 'body', 'createdAt', '_id');
        done();
      });
  });

  it('should be able to get a note by id', (done) => {
    request(app)
      .get('/notes/5a9ebdf96162ed55c3072344')
      .expect(200)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res.body);
        const noteSample = res.body;
        noteSample.should.have.only.keys('title', 'body', 'createdAt', '_id');
        done();
      });
  });

  it('should be able to create a new note', (done) => {
    request(app)
      .post('/notes')
      .expect(200)
      .type('form')
      .send({
        title: 'Test Note',
        body: 'Test Note Body',
      })
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res.body);
        const noteSample = res.body;
        noteSample.should.have.only.keys('title', 'body', 'createdAt', '_id');
        noteSample.title.should.be.exactly('Test Note');
        noteSample.body.should.be.exactly('Test Note Body');
        done();
      });
  });
});
