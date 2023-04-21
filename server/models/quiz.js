const mongoose = require('mongoose');
// const Question = require('./question');

const Schema = mongoose.Schema;
const quizSchema = new Schema({
  name: String,
  questions: [{
    _id: mongoose.Schema.Types.ObjectId,
    question: String,
    answer: String,
    // ref: 'Question'
  }]
}, { versionKey: false })

const Quiz = mongoose.model('quiz', quizSchema, 'quizzes')

module.exports = Quiz
