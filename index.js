const path = require("path");
const express = require("express");
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 8080;
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Use the express-fileupload middleware
app.use(fileUpload({
    limits: {
        fileSize: 4000000, // Around 4MB
    },
    abortOnLimit: true,
}));
// set static folder for frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`));
