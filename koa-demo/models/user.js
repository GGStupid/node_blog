const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Number,
    default: Date.now()
  }
}, { versionKey: false })

module.exports = mongoose.model('User', UserSchema)