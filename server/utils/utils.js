const Session = require('../models/session');
const mongoose = require('mongoose');
const limiter = require('express-rate-limit');

const initSession = async (userId) => {
  const token = await Session.generateToken();
  const csrfToken = await Session.generateToken();
  const session = await Session.findOneAndUpdate({userId}, {$set: { token, csrfToken}}, {new: true, upsert: true});
  return session;
};

const isEmail = (email) => {
  if (typeof email !== 'string') {
    return false;
  }
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return emailRegex.test(email);
};


const rateLimiter = (
  windowMs = 1000 * 60 * 60,
  max = 10,
  message = "Too many requests. Please try again in an hour"
) => limiter({ windowMs, max, message });




module.exports = { initSession, isEmail, rateLimiter };
