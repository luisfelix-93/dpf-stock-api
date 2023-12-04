const express = require('express');
const Router = express.Router;
const sessionController = require('../src/controllers/SessionController');
const auth = require('./middleware/auth')
const userController = require('../src/controllers/UserController');



const routes = new Router();
routes.post('/sessions', sessionController.create);
routes.get('/user/:id', userController.index)
routes.post('/user', userController.register)


module.exports = routes;