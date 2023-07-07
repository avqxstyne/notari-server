import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import Note from './mvc/notes.model.mjs'
import mongoose from "mongoose";
import connect from './config/database.mjs';
import { addNoteToMongo, getNotesToSidebar, findNoteFromDB } from './mvc/notes.controller.mjs';


const app = express();
const port = 5171;
var jsonParser = bodyParser.json()

app.use(cors());
app.listen(port,()=>console.log(`Example app listening on port ${port}!`),);
connect();


// called on mount to fetch sidebar links
app.get('/getsidebar', async (req, res) => {
	getNotesToSidebar(req, res)
});

// Gets a specific note (called when sidebar link is pressed)
app.post('/findnote', express.json(jsonParser), async (req, res) => {
	findNoteFromDB(req, res)
})

// This object combines the two paths 
let addNewNote = {};
app.post('/addnewnote/blob', express.text(), (req, res) => {
	addNewNote.note = req.body;
	res.send({status: 'good'});
}); app.post('/addnewnote/credentials', express.json(jsonParser), (req, res) => {
	addNewNote.userName = req.body.userName;
	addNewNote.fileName = req.body.fileName;

	res.send({status: 'good'});

	req.on("close", () => {
		addNoteToMongo(addNewNote)
	})
})


// This object combines the two paths 
let updateToExistingNote = {};
app.post('/updatenote/blob', express.text(), (req, res) => {
	updateToExistingNote.note = req.body;
	res.send({status: 'good'});
}); app.post('/updatenote/credentials', express.json(jsonParser), (req, res) => {
	updateToExistingNote.userName = req.body.userName;
	updateToExistingNote.fileName = req.body.fileName;

	res.send({status: 'good'});

	req.on("close", async () => {
		const updatedUser = await Note.updateOne({ 
			fileName: updateToExistingNote.fileName
		}, {
			note: updateToExistingNote.note
		});
	})
})







