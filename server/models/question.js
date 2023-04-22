const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  answer: String
}, { versionKey: false })

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
