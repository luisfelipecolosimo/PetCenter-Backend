const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');


const routes = express.Router();

routes.get('/session', (req,res) =>{});


routes.post('/user', (req,res) =>{});
routes.get('/user', (req,res) =>{});
//routes.delete('/user', (req,res) =>{});

routes.get('/profile', (req,res) =>{});

routes.post('/incidents', (req,res) =>{});
routes.get('/incidents', (req,res) =>{});
routes.delete('/incidents/:id', (req,res) =>{});

module.exports = routes;