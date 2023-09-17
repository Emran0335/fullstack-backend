const express = require("express");
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: " HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can only execute only JavaScript ",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol ",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  if (note) {
    res.json(note);
  } else {
    res.status(404).end("Page is not found as routing param does not exist!");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log('delete', id)
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end("This note is deleted from the json server!");
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content is missing",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };
  notes = notes.concat(note);
  console.log(note);
  res.json(note);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running ${PORT}`));
