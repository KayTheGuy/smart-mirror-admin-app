const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const formType = require('./model/form-type').forms;
const dbName = require('./model/form-type').dbName;
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/forms/type', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	db.readAll(dbName, formType.EVENTS)
	.then((data) => {
		res.status(200).json(data);
	})
	.catch((err) => {
		res.status(500).json(null);
	});
});

app.post('/form/:type', function (req, res) {
	if (req.body) {
		db.writeObject(dbName, req.params.type, req.body);
	}
	res.status(200).json({'a': 12});
});

app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT} ...`);
});
