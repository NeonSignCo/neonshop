
const { register, getMe, login, logOut, deleteMe } = require('../handlers/users');
const { authenticate } = require('../middleware/authenticate');
const { csrfCheck } = require('../middleware/csrfCheck');
const { rateLimiter } = require('../utils/utils');

const Router = require('express').Router();



 
Router.post('/register', register);
Router.get('/me', authenticate, getMe);
Router.post('/login', rateLimiter(), login);
Router.put('/logout', authenticate, csrfCheck, logOut);
Router.delete('/delete-me', rateLimiter(), authenticate, csrfCheck, deleteMe);






module.exports = Router;