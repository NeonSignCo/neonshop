const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  userName: {
    type: String,
    required: [true, "userName is required"],
  },
  photo: String,
  email: {
    type: String,
    required: [true, "email is required"],
    minlength: 1,
    trim: true, 
    index: true,
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: (val) => String(val).length >= 6 && String(val).length <= 16,
      message: "password must be 6 to 16 characters long", 
      
    }, 
    required: [true, "password is required"]
  }, 
  role: {
    type: String, 
    enum: {
      values: ['ADMIN', 'USER'], 
      default: 'USER',
      message: "role must be one of 'ADMIN', 'USER'"
    },
  }
}, { timestamps: true});

UserSchema.plugin(uniqueValidator, {
  message: "User with same {{PATH}} already exists",
});

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

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
