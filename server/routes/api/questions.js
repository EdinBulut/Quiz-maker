const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../../models/question');

require('dotenv').config();
const db = process.env.MONGO_DATABASE;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to DB'))
  .catch((err) => {
    console.log(`there is a problem with: ${err.message}`);
    process.exit(-1)
  })

router.get('/', (req, res) => {
  Question.find()
    .then(questions => {
      res.json(questions);
    })
    .catch(err => console.log(err.message))
})

router.get('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => console.log(err.message))
})

router.post('/', (req, res) => {
  const questionData = req.body;
  const question = new Question(questionData);
  question.save()
    .then(insertedQuestion => res.json(insertedQuestion))
    .catch(err => res.json({
      message: err
    }))

})

router.put('/questions/:id', async (req, res) => {
  const body = req.body

  try {
    const updatedQuestion = await Question.updateOne({
      _id: req.params.id
    }, {
      $set: {
        question: body.question,
        answer: body.answer
      }
    })
    res.json(updatedQuestion)
  } catch (err) {
    res.json({
      message: err
    })
  }

})

router.delete('/questions/:id', (req, res) => {
  // Question.remove({_id: req.params.id})
  Question.findByIdAndRemove(req.params.id)
    .then(deletedQuestion => res.json(deletedQuestion))
    .catch(err => res.json({
      message: err
    }))
})

module.exports = router;
