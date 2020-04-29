require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(morgan('dev'));
app.use(routes);
app.use(errors());

module.exports = app;