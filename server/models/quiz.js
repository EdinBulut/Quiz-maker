const mongoose = require('mongoose');
const Question = require('./question');

const Schema = mongoose.Schema;
const quizSchema = new Schema({
  name: String,
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
}, { versionKey: false })

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz
