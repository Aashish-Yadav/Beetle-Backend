const express = require('express');
const Auth = require('../Controllers/AuthController')
const Router = express.Router();

Router.post('/signup',Auth.signUp);
Router.post('/signin',Auth.signIn);

module.exports = Router;