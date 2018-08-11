const db = require("../db.js");
const formType = require('../../model/form-type').forms;
const dbName = require('../../model/form-type').dbName;

db.writeObject(dbName, formType.EVENTS, {
	"title": 'First Smart Mirror Presentation',
	"description": 'We want to show the MVP that ... ',
	"location": "Vancouver SAP Lab",
	"Date": "August 10th, 2018"
})
.then(statusCode => {
	console.log(statusCode);
})
.catch(err => console.log(err));
