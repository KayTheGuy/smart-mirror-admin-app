const fs = require('fs');
const path = require('path');
const db = require('./db/db');
const multer = require('multer');
const shell = require('shelljs');
const express = require('express');
const bodyParser = require('body-parser');
const dbName = require('./model/form-type').dbName;
const formType = require('./model/form-type').forms;

const PORT = 5000;
const IMAGES_FOLDER = 'images';

const app = express();
app.use(bodyParser.json({limit: '150mb', extended: true}));

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let newDestination = path.join(IMAGES_FOLDER, req.params.type, req.params.timestamp);
		let stat = null;
		try {
			stat = fs.statSync(newDestination);
		} catch (err) {
			shell.mkdir('-p', newDestination);
		}
		if (stat && !stat.isDirectory()) {
			throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
		}       
		cb(null, newDestination);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

var upload = multer({ 
	limits: {
		fileSize: 60000000
	}, 
	storage: storage,        
}).array('files', 5);

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

app.post('/form/:type/:timestamp', function (req, res) {
	upload(req, res, function(err) {
		// add destination of first file to db if any
		if (req.files.length > 0) {
			req.body.images_path = req.files[0].destination;
			db.writeObject(dbName, req.params.type, req.body)
			.then(status => res.status(status).send())
			.catch(() => console.log(`Failed to post form of type ${req.param.type}`))
		}
		if(err) {
			res.status(500).send();
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT} ...`);
});
