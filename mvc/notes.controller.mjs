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

export const deleteNote = async (req, res) => {
    const fileName = req.body.notename;

    await Note.deleteOne({ fileName: `${fileName}`})

	res.send({
		status: "all good"
	})

}




