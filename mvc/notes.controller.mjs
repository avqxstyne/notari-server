// todo 

// add note
// delet note 
// save and override a note

import Note from "./notes.model.mjs";

export const getNotes = async (req, res) => {
    const notes = await Note.find();
    return notes; 
}

export const addNote = async (req, res) => {
    const newNote = await Note.create(req.body);
    return newNote;
}

const updateNote = async (req, res) => {
    const updatedUser = await Note.findOneAndUpdate(req.params.id, req.body);
    res.send(updatedUser)
}

const deleteNote = async (req, res) => {
    const user_id = req.params.id;
    await Note.findByIdAndRemove(user_id);
    res.send(`Confirmed: User ${user_id} was deleted.`)
}




