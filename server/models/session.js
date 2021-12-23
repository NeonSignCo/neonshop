import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'
import crypto from 'crypto';

const SessionSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: 'user'
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


SessionSchema.statics.genToken = () => new Promise(async (resolve, reject) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    resolve(token);
  } catch (error) {
    reject(error.message)
  }
})

const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);

export default Session;
