const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const db = require('./db/db');
const formType = require('./model/form-type').forms;
const dbName = require('./model/form-type').dbName;
const app = express();
const PORT = 5000;
const IMAGES_FOLDER = 'images';

app.use(bodyParser.json({limit: '150mb', extended: true}));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
		var newDestination = path.join(IMAGES_FOLDER, req.params.type, Date.now().toString());
		var stat = null;
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
	dest: IMAGES_FOLDER,
	limits: {
		fieldNameSize: 100,
		fileSize: 60000000
	}, 
	storage: storage,        
});

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
	// console.log(req.body);
	// console.log(req.files);
	// db.writeObject(dbName, req.params.type, req.body)
	// .then(status => res.status(status).send())
	// .catch(() => console.log(`Failed to post form of type ${req.param.type}`))
});

app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT} ...`);
});
