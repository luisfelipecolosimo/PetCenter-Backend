const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const multer = require('multer');
const multerConfig = require('./config/multer');


const routes = express.Router();

routes.get('/session', (req,res) =>{});


routes.post('/user', (req,res) =>{});
routes.get('/user', (req,res) =>{});
//routes.delete('/user', (req,res) =>{});

routes.get('/profile', (req,res) =>{});

routes.post('/incidents', (req,res) =>{});
routes.get('/incidents', (req,res) =>{});
routes.delete('/incidents/:id', (req,res) =>{});


routes.post('/test',multer(multerConfig).single('image'), (req,res) =>{
  console.log(req.file);
  const {user} = req.body
  const {location:url=''} = req.file
  console.log(user);
  console.log(url);
  return res.json({msg : req.file.filename})
 });

module.exports = routes;