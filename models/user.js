const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  streetName: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  complement: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: false
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
})

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true
})

exports.User = mongoose.model('User', userSchema)
exports.userSchema = userSchema