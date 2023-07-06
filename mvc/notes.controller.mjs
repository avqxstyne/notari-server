// todo 

// add note
// delet note 
// save and override a note

import Note from "./notes.model.mjs";

export const addNoteToMongo = async (reqInformation) => {
    const user = await Note.create({
		userName: reqInformation.userName,
		fileName: reqInformation.fileName,
		note: reqInformation.note,
	});
}

export const getNotesToSidebar = async (req, res) => {
    const notes = await Note.find();
	const sidebarLinks = new Object();	
	for (let i = 0; i < notes.length; i++) {
		sidebarLinks[`note${i}`] = notes[i].fileName;
	}
	res.send(sidebarLinks)
};

export const findNoteFromDB = async (req, res) => {
	let noteName = req.body.notename;
	let desiredNote;

	const notes = await Note.find()
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].fileName == noteName) {
			desiredNote = notes[i].note;
		}
	}
	res.send(desiredNote)
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




