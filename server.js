const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkapi');

// mongoose.set("debug", true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`))