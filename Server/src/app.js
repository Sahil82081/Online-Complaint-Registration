const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 8000;
const routes = require('../routes/apiroutes');

const corsOptions = {
    origin: process.env.DOMAIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Welcome To My Server');
});

app.listen(PORT, () => {
    console.log(`Server was Started at Port ${PORT}`);
})