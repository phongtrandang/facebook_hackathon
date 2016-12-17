'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

require('dotenv').config();
const configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/questions',require('./routes/api/questions'));
app.use('/api/v1/answers', require('./routes/api/answers'));
app.use('/api/v1/hardQuestions', require('./routes/api/hardQuestions'));

module.exports = app;