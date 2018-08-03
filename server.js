const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/forms/type', (req, res) => {
    if (type === "event") {

    } else if ((type === "news")) {

    }
    res.setHeader('Content-Type', 'application/json');
    res.json({
        a: 1
    });
});

app.post('/events/', function (req, res) {
    console.log(req.body);
    res.status(200).send();
});

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT} ...`);
});
