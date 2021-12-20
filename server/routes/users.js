
const {
  register,
  getMe,
  login,
  logOut,
  deleteMe,
  getAllUsers,
} = require("../handlers/users");
const { authenticate } = require('../middleware/authenticate');
const { rateLimiter } = require('../utils/utils');

const Router = require('express').Router();



Router.get('/', getAllUsers)
Router.post('/register', register);
Router.get('/me', authenticate, getMe);
Router.post('/login', rateLimiter(), login);
Router.put('/logout', authenticate, logOut);
Router.delete('/delete-me', rateLimiter(), authenticate, deleteMe);






module.exports = Router;