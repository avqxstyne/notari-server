import cors from 'cors';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'
const port = 5171
const app = express();
const __dirname = path.resolve();

// const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

app.use(cors());


app.use(express.static('public'));
app.get('*', (req, res) => {
	console.log(req.params, req.body)
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(port, () =>
 	console.log(`Example app listening on port ${port}!`),
);

app.post('/login', jsonParser, (req, res) => {
	console.log(req.body)
	res.send("hello there gay")
});

