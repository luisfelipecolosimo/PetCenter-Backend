const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');


const routes = express.Router();

routes.get('/session', (req,res) =>{
  console.log('ola foi');
  return res.status(400).json({ error: 'no ONG found with this ID' })
});

module.exports = routes;