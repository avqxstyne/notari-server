import cors from 'cors';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const port = 5171;
const app = express();
const __dirname = path.resolve();

var jsonParser = bodyParser.json()
app.use(cors());

// Setting up path for html file
// app.use(express.static('public'));
// app.get('*', (req, res) => {
// 	console.log(req.params, req.body)
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// Setting the port 
app.listen(port, () =>
 	console.log(`Example app listening on port ${port}!`),
);

// Login post request reciever
app.post('/login', jsonParser, (req, res) => {
	console.log(req.body)




	res.send("hello there gay")
});

// Homescreen - get all notes and turn into elements in sidebar
app.get('/getsidebar', (req, res) => {
	res.send({
		note1: "Sleep",
		note2: "To-do list",
		note3: "Morning routine",
		note4: "Evening routine"
	})
})

