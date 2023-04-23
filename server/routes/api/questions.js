const express = require('express');
const router = express.Router();
const Question = require('../../models/question');
const Quiz = require('../../models/quiz');




router.get('/', (req, res) => {
  Question.find()
    .then(questions => {
      res.json(questions);
    })
    .catch(err => console.log(err.message))
})





router.get('/search/:searchValue', (req, res) => {
  const searchValue = req.params.searchValue.toLowerCase()
  Question.find(
    {
      $or: [
        {question: { $regex: new RegExp(searchValue, "i") }},
        {answer: { $regex: new RegExp(searchValue, "i") }}
      ] 
    }
    )
    .then(questions => {
      res.json(questions);
    })
    .catch(err => console.log(err))
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





router.put('/:id', async (req, res) => {
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





router.delete('/:id', async (req, res) => {
  const questionId = req.params.id;

  try {
    // Find all quizzes that contain the deleted question's ID
    const quizzesToUpdate = await Quiz.find({ questions: questionId });

    // Remove the deleted question's ID from the questions array in each of the found quizzes
    const updateOperations = quizzesToUpdate.map(quiz => {
      const updatedQuestions = quiz.questions.filter(q => q.toString() !== questionId);
      return Quiz.findByIdAndUpdate(quiz._id, { questions: updatedQuestions }, { new: true });
    });

    // Execute all update operations in parallel
    const updatedQuizzes = await Promise.all(updateOperations);

    // Delete the question from the database
    const deletedQuestion = await Question.findByIdAndRemove(questionId);

    // Return the deleted question and the updated quizzes
    res.json({ deletedQuestion, updatedQuizzes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
