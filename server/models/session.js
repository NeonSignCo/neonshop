const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');

const SessionSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ['valid', 'expired'],
    default: 'valid',
  },
}, {timestamps: true});

SessionSchema.plugin(uniqueValidator, {
  message: "token with same {PATH} already exists",
});

SessionSchema.statics.generateToken = function() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err);
      }
      const token = buf.toString('hex');
      resolve(token);
    });
  });
};



SessionSchema.statics.expireAllTokensForUser = function(userId) {
  return this.deleteOne({userId})
};


module.exports = mongoose.models.Session || mongoose.model('Session', SessionSchema);
