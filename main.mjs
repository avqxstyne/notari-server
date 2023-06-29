import cors from 'cors';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import db from './config/database.mjs'
import { addNote, getNotes } from './mvc/notes.controller.mjs'
const port = 5171;
const app = express();
const __dirname = path.resolve();

var jsonParser = bodyParser.json()
app.use(cors());

db()


// Setting the port 
app.listen(port, () =>
 	console.log(`Example app listening on port ${port}!`),
);

// // Login post request reciever
// app.post('/login', jsonParser, (req, res) => {
// 	console.log(req.body)

// 	res.send("hello there gay")
// });

// Homescreen - get all notes and turn into elements in sidebar
app.get('/getsidebar', async (req, res) => {

	// console.log(await getNotes())

	// res.setHeader("Access-Control-Allow-Origin", "*");
	res.send({
		note1: "Sleep",
		note2: "To-do list",
		note3: "Morning routine",
		note4: "Evening routine"
	})
});
//, express.json(jsonParser)  

app.post('/addnewnote', express.text(), (req, res) => {
	console.log(req.body);

	res.send({
		status: "good"
	})
})

