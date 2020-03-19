//server port
var express = require("express");
var path = require("path");
var fs = require("fs");
var notes = [];
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));



// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", "utf-8", function (err, data) {
    res.json(JSON.parse(data))
  })
});



app.post("/api/notes", function (req, res) {

  var newNotes = req.body;
  fs.readFile(__dirname + "/db/db.json", "utf-8", function read(err, data) {
    notes = JSON.parse(data);
    notes.push(newNotes)
    console.log(notes)
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes),function read(err) {
      if (err) {
        return console.log(err);
      }
      console.log("the file was saved")
    });
  });
  res.json(newNotes);

});







app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
