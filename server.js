const express = require ("express");
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("/api/notes",(req, res) => {
    var savedNotes = fs.readFileSync(path.join(__dirname, "./db/db.json"))
    savedNotes = JSON.parse(savedNotes)
    res.json(savedNotes)
  });

app.post("/api/notes",(req, res) => {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    var noteID = (savedNotes.length).toString();
    var newNote = req.body;
    newNote.id = noteID;
    savedNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
  });





  app.listen(PORT, () => {
    console.log(`API server is listening on port ${PORT}!`);
  });