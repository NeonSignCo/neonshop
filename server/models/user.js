const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  photo: {
    title: {
      type: String,
      required: [true, 'title is required']
    },
    alt: {
      type: String,
      required: [true, 'alt is required']
    },
    src: {
      type: String,
      required: [true, 'src is required']
    },
    type: Object,
    required: false
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: val => String(val).length >= 8 && String(val).length <= 16,
      message: "password must be 8 to 16 characters long"
    }
  },
});

UserSchema.plugin(uniqueValidator, {message: "user with same {PATH} already exists"});

UserSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt
    .genSalt(12)
    .then((salt) => {
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => next(err));
});

module.exports = mongoose.model('User', UserSchema);
