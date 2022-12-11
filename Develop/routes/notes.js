const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET route for retrieving all the notes
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//GET Route for a specific note
notes.get('/:note_id', (req,res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id ===noteId);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
      });
});

// POST Route for a new note
notes.post('/',(req,res) => {
  console.log(req.body);

  const { title, text } = notes.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      noteId: uuidv4()
    };

    readAndAppend(newNote, './db/db.json');
    res.json('Note saved successfully!');
  } else {
    res.errored('Sorry, there was an error when adding your note. Please try again!')
  }
});

module.exports = notes;