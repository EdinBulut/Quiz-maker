const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quiz = require('../../models/quiz');

require('dotenv').config();
const db = process.env.MONGO_DATABASE;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to DB'))
  .catch((err) => {
    console.log(`there is a problem with: ${err.message}`);
    process.exit(-1)
  })

router.get('/', (req, res) => {
  Quiz.find()
    .then(quizzes => {
      res.json(quizzes);
    })
    .catch(err => console.log(err.message))
})


router.get('/:search', (req, res) => {
  const search = req.params.search.toLowerCase()
  Quiz.aggregate([
    {$project:{lowerCaseName: { $toLower: "$name" }, name: "$name", questions: "$questions", _id: '$_id'}},
    {$match: {lowerCaseName: {$regex: search}}  }
    ])
    .then(quizzes => {
      res.json(quizzes);
    })
    .catch(err => console.log(err.message))
})



router.get('/:id', (req, res) => {
  Quiz.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => console.log(err.message))
})

router.post('/', (req, res) => {
  let questionData = req.body;
  const question = new Quiz(questionData);
  question.save()
    .then(insertedQuiz => res.json(insertedQuiz))
    .catch(err => res.json({
      message: err
    }))

})

router.put('/:id', async (req, res) => {

  try {
    const updatedQuiz = await Quiz.updateOne({
      _id: req.params.id
    }, {
      $set: {
        name: req.body.name,
      }
    })
    res.json(updatedQuiz)
  } catch (err) {
    res.json({
      message: err
    })
  }

})

router.delete('/:id', (req, res) => {
  Quiz.findByIdAndRemove(req.params.id)
    .then(deletedQuiz => res.json(deletedQuiz))
    .catch(err => res.json({
      message: err
    }))
})

module.exports = router;
