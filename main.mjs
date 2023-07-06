import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import Note from './mvc/notes.model.mjs'
import mongoose from "mongoose";
import connect from './config/database.mjs';
import { addNoteToMongo, getNotesToSidebar } from './mvc/notes.controller.mjs';


const app = express();
const port = 5171;
var jsonParser = bodyParser.json()

app.use(cors());
app.listen(port,()=>console.log(`Example app listening on port ${port}!`),);
connect();


// Homescreen - get all notes and turn into elements in sidebar
app.get('/getsidebar', async (req, res) => {
	getNotesToSidebar(req, res)
});

let newnote = {};
app.post('/addnewnote/blob', express.text(), (req, res) => {
	newnote.note = req.body;
	res.send({status: 'good'});
}); 
app.post('/addnewnote/credentials', express.json(jsonParser), (req, res) => {
	newnote.userName = req.body.userName
	newnote.fileName = req.body.fileName

	res.send({status: 'good'});

	req.on("close", () => {
		addNoteToMongo(newnote)
	})
})

app.post('/findnote', express.json(jsonParser), async (req, res) => {
	let noteName = req.body.notename;
	let desiredNote;

	const notes = await Note.find()
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].fileName = noteName) {
			desiredNote = notes[i].note;
		}
	}



	console.log(desiredNote) 
	res.send({status: "good"})

})


