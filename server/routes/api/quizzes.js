const express = require('express');
const router = express.Router();
const Question = require('../../models/question');
const Quiz = require('../../models/quiz');
const mongoose = require('mongoose');




router.get('/', (req, res) => {
  // Quiz.aggregate([
  //   {$lookup: {from: 'questions', localField: 'questions', foreignField:'_id', as: 'questions'}}
  // ]) // --> also works fine
  Quiz.find().populate('questions')
    .then(quizzes => {
      res.json(quizzes);
    })
    .catch(err => console.log(err.message))
})





router.get('/search/:search', (req, res) => {
  const search = req.params.search.toLowerCase()
  Quiz.aggregate([
    {$project:{lowerCaseName: { $toLower: "$name" }, name: "$name", questions: "$questions", _id: '$_id'}},
    {$match: {lowerCaseName: {$regex: search}}  }
    ])
    .then(quizzes => {
      res.json(quizzes);
    })
    .catch(err => console.log(err))
})





router.get('/:id', (req, res) => {
  Quiz.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => console.log(err.message))
})





router.post('/', (req, res) => {
  const body = req.body;
  const questionsIDs = body.questionIDs.map(ID => new mongoose.Types.ObjectId(ID))

  const createQuizObj = {
    name: body.name,
    questions: questionsIDs
  }

  const question = new Quiz(createQuizObj);
  question.save()
    .then(insertedQuiz => res.json(insertedQuiz))
    .catch(err => res.json({
      message: err
    }))
})




router.put('/:quizID/questions/:questionID', async (req, res) => {
  const quizID = new mongoose.Types.ObjectId(req.params.quizID)
  const questionID = new mongoose.Types.ObjectId(req.params.questionID)

  try {
    const isDuplicate = await Quiz.findOne({_id: quizID,questions: {$in: [questionID]}})
    if (!!isDuplicate) res.status(409).json({ message: "Item already exists"})
    // else insertQuestionIntoQuiz(quizID, questionID, res)
    else {
      try {
        const updatedQuiz = await Quiz.updateOne({_id: quizID}, {$push: {"questions": {_id: questionID}}})
        if (updatedQuiz) {
          Question.findById(req.params.questionID).then(foundQestion => {
            res.json(foundQestion)
          })
        }
      } catch (err) {
        res.status(500).json({
          message: err.message
        })
      }
    }
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
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




// async function insertQuestionIntoQuiz(quizID, questionID, res) {
//   try {
//     const updatedQuiz = await Quiz.updateOne({_id: quizID}, {$push: {"questions": {_id: questionID}}})
//     if (updatedQuiz) {
//       Question.findById(req.params.questionID).then(foundQestion => {
//         res.json(foundQestion)
//       })
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: err.message
//     })
//   }
// }
