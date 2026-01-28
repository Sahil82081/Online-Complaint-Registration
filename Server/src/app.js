const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 8000;
const routes = require('../routes/apiroutes');

const allowedOrigins = process.env.DOMAINS.split(",");
console.log(allowedOrigins);
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Welcome To My Server');
});

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server was Started at Port ${PORT}`);
})