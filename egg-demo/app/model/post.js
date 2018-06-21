'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  const PostSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    pv: {
      type: Number,
      default: 0,
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    createAt: {
      type: Number,
      default: Date.now(),
    },
    updateAt: {
      type: Number,
      default: Date.now(),
    },
  }, { versionKey: false });

  return mongoose.model('Post', PostSchema);

};
