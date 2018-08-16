const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const db = require('./db/db');
const formType = require('./model/form-type').forms;
const dbName = require('./model/form-type').dbName;
const app = express();
const PORT = 5000;

app.use(bodyParser.json({limit: '150mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}))

var upload = multer({ dest: 'uploads/' })

app.get('/forms/type', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	db.readAll(dbName, formType.EVENTS)
	.then((data) => {
		res.status(200).json(data);
	})
	.catch((err) => {
		console.log(err);
		res.status(500).json(null);
	});
});

app.post('/form/:type', upload.array('files', 12), function (req, res) {
	console.log(req.body);
	console.log(req.files);
	// db.writeObject(dbName, req.params.type, req.body)
	// .then(status => res.status(status).send())
	// .catch(() => console.log(`Failed to post form of type ${req.param.type}`))
});

app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT} ...`);
});
