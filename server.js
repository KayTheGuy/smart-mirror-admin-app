const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const formType = require('./db/form-type').forms;
const dbName = require('./db/form-type').dbName;
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/forms/type', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.readAll(dbName, formType.EVENTS)
    .then((data) => {
        console.log(data);
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(null);
    });
});

app.post('/events/', function (req, res) {
    console.log(req.body);
    res.status(200).send();
});

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT} ...`);
});
