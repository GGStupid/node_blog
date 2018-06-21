'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createAt: {
      type: Number,
      default: Date.now(),
    },
  }, { versionKey: false });

  return mongoose.model('User', UserSchema);
};
