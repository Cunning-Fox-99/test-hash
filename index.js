const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 8000;

app.use(express.json());

// Добавляем middleware для обработки CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешаем все домены. Для продакшн приложений лучше указать конкретный домен.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Отправляем 200 для предварительных запросов
    }
    next();
});


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