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

// This object combines the two paths 
let newnote = {};
app.post('/addnewnote/blob', express.text(), (req, res) => {
	newnote.note = req.body;
	res.send({status: 'good'});
}); app.post('/addnewnote/credentials', express.json(jsonParser), (req, res) => {
	newnote.userName = req.body.userName;
	newnote.fileName = req.body.fileName;

	res.send({status: 'good'});

	req.on("close", () => {
		addNoteToMongo(newnote)
	})
})

app.post('/findnote', express.json(jsonParser), async (req, res) => {
	findNoteFromDB(req, res)
})


