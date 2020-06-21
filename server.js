// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// empty notes (DATA)
// =============================================================
var notes = require('./Develop/db/db.js');

// Routes
// =============================================================
app.use(express.static('Develop/public'));
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {

    return res.json(notes);
});

// Displays a single note, or returns false
app.get("/api/notes/:notes", function (req, res) {
    var chosen = req.params.notes;

    console.log(chosen);

    for (var i = 0; i < notes.length; i++) {
        if (chosen === notes[i].id) {

            notes.splice(i, 1);
        }
    }
    return res.json(notes);

});

// Create New notes - takes in JSON input
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNotes = req.body;

    // Using a RegEx Pattern to remove spaces from newNotes
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newNotes.routeName = newNotes.name.replace(/\s+/g, "").toLowerCase();

    console.log(req.body);

    notes.push(newNotes);

    res.json(newNotes);
});

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM notes WHERE ?", { id }, (err, response) => {
        return res.json(response);
    })
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
