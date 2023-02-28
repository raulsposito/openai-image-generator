const express = require("express");
const port = process.env.PORT || 8080;

const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`));
