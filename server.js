const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ a: 1 });
});
  
app.listen(5000);
