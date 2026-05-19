const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const NoteSchema = new mongoose.Schema({
  text: String
});

const Note = mongoose.model("Note", NoteSchema);

app.get("/notes", async (req, res) => {
  const notes = await Note.find();

  if (notes.length === 0) {
    await Note.create({ text: "Learn Docker Compose" });
    await Note.create({ text: "Learn CI/CD" });

    return res.json(await Note.find());
  }

  res.json(notes);
});

app.listen(5000, () => {
  console.log("Backend API running on port 5000");
});
