const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const {GetNotes,AddNotes,UpdateNotes,DeleteNotes} = require('../Controllers/notes');
const fetchuser = require('../Middleware/fetchuser');


// Getting all the notes using: GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes',fetchuser, GetNotes);


// Creating a note using: POST "/api/notes/addnotes". Login required

router.post('/addnotes',fetchuser, [
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5}),
]
, AddNotes);


// Updating an existing note using: PUT "/api/notes/updatenotes". Login required

router.put('/updatenotes/:id',fetchuser, UpdateNotes);


// Deleting an existing note using: DELETE "/api/notes/deletenotes". Login required

router.delete('/deletenotes/:id',fetchuser, DeleteNotes);


module.exports = router;