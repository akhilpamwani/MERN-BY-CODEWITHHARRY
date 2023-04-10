
const Notes = require("../Models/notes");
const { validationResult } = require("express-validator");

exports.GetNotes = async (req, res) => {
  try {


    // Fetchuser is used to get the user id from jwt token

    const notes = await Notes.find({ user: req.user.id });

    // Fetching Notes

    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

exports.AddNotes = async (req, res) => {

  
  // Checking Validation

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Request Body

  const { title, description, tags } = req.body;

  try {
    // Creating Note

    const note = new Notes({
      title,
      description,
      tags,
      user: req.user.id,
    });

    // Saving Note

    const savedNote = await note.save();

    // Sending Response

    res.json({ msg: "Notes has been added", data: savedNote });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

exports.UpdateNotes = async (req, res) => {
  try {
    //  Request Body
    const { title, description, tags } = req.body;

    const newNote = {};

    if (title && description && tags) {
      newNote.title = title;
      newNote.description = description;
      newNote.tags = tags;
    }

    // Find the note to be updated and update it

    let note = await Notes.findById(req.params.id);

    if (!note) {
      res.status(404).send("Not Found");
    }
    if (note.user.toString() != req.user.id) {
      res.status(401).send("Not Allowed");
    }

    // Updating Note

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: newNote,
      },
      {
        new: true,
      }
    );

    // Sending Response

    res.status(200).json({ msg: "Note has been updated", data: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

exports.DeleteNotes = async (req, res) => {
  try {


    // Find the note to be deleted and delete it

    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }
    if (note.user.toString() != req.user.id) {
      res.status(401).send("Not Allowed");
    }

    // Deleting Note

    note = await Notes.findByIdAndDelete(req.params.id);

    // Sending Response

    res.status(200).json({ msg: "Note has been Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
