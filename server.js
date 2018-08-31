const fs = require('fs');
const cors = require('cors');
const path = require('path');
const db = require('./db/db');
const multer = require('multer');
const shell = require('shelljs');
const express = require('express');
const bodyParser = require('body-parser');
const dbName = require('./model/form-type').dbName;

const PORT = 5000;
const IMAGES_FOLDER = 'images';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let newDestination = path.join(IMAGES_FOLDER, req.params.timestamp);
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

app.get(`/${IMAGES_FOLDER}/:timestamp/:filename`, (req, res) => {
	let imgRelPath = '/' + req.params.timestamp + '/' + req.params.filename;
	res.sendFile(path.join(__dirname, IMAGES_FOLDER, imgRelPath));
}); 

app.get('/forms', (req, res) => {
	db.readAll(dbName, 'FORMS')
	.then(entries => {
		result = [];
		entries.forEach(entry => {
			if (entry.imagesPath) {
				entry.imagePaths = [];
				try {
					fs.readdirSync(entry.imagesPath).forEach(filename => {
						entry.imagePaths.push(entry.imagesPath + '/' + filename);
					});
				} catch (error) {
					console.log(`Unable to read the files from dir: ${entry.imagesPath}`);
				}
			} 
			result.push(entry);
		});
		res.status(200).json(result);
	})
	.catch((err) => {
		console.log(err);
		res.status(500).json(null);
	});
});

app.post('/form/:timestamp', (req, res) => {
	upload(req, res, function(err) {
		let emptyFolder = false;
		// add destination of the first file to form, if any
		if (req.files.length > 0) {
			req.body.imagesPath = req.files[0].destination;
		}
		db.writeObject(dbName, 'FORMS', req.body)
		.then(status => res.status(status).send())
		.catch(() => {
			console.log("Failed to post form");
			res.status(503).send();
			emptyFolder = true;
		})
		if (err) {
			emptyFolder = true;
			console.log(err);
			res.status(500).send();
		}
		if (emptyFolder) {
			fs.rmdir(path.join(IMAGES_FOLDER, req.params.timestamp));
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT} ...`);
});
