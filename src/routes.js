const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const multer = require('multer');
const multerConfig = require('./config/multer');

const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');


const routes = express.Router();

routes.post('/session', SessionController.create);

routes.post('/user', UserController.create);
routes.get('/user',  UserController.index);
//routes.delete('/user', (req,res) =>{});

routes.get('/profile', ProfileController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);


routes.post('/test',multer(multerConfig).single('image'),IncidentController.create );

module.exports = routes;