const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  pv: {
    type: Number,
    default: 0
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  createAt: {
    type: Number,
    default: Date.now()
  },
  updateAt: {
    type: Number,
    default: Date.now()
  }
}, { versionKey: false })

PostSchema.pre('save', function (next) {
  this.updateAt = Date.now()
  next()
})

module.exports = mongoose.model('Post', PostSchema)