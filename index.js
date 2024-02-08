const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 8000;

app.use(express.json());

app.post('/get-sha1', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).send('Missing data parameter');
    }

    const hash = crypto.createHash('sha1').update(data).digest('hex');
    res.send(hash);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});