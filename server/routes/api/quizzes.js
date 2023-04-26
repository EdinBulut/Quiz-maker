const express = require('express');
const router = express.Router();
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





router.get('/search/:searchValue', (req, res) => {
  const searchValue = req.params.searchValue.toLowerCase()
  Quiz.find({
      name: {
        $regex: new RegExp(searchValue, "i")
      }
    }).populate("questions")
    .then(quizzes => {
      res.json(quizzes);
    })
    .catch(err => console.log(err))
})





router.get('/:id', (req, res) => {
  Quiz.findById(req.params.id).populate('questions')
    .then(question => res.json(question))
    .catch(err => res.status(404).json({message: err.message}))
})





router.post('/', (req, res) => {
  const body = req.body;
  const questionsIDs = body.questionIDs.map(ID => new mongoose.Types.ObjectId(ID))

  const createQuizObj = {
    name: body.name,
    questions: questionsIDs
  }

  const quiz = new Quiz(createQuizObj);
  quiz.save()
    .then(insertedQuiz => Quiz.findById(insertedQuiz._id).populate('questions'))
    .then(populatedQuiz => res.json(populatedQuiz))
    .catch(err => res.json({
      message: err
    }))
})





router.put('/:quizID/add/questions/:questionID', async (req, res) => {
  const quizID = new mongoose.Types.ObjectId(req.params.quizID)
  const questionID = new mongoose.Types.ObjectId(req.params.questionID)

  Quiz.findOne({_id: quizID, questions: {$in: [questionID]}})
  .then(foundQuiz => {
    if (!!foundQuiz) res.status(409).json({ message: "Item already exists"})
    else {
      Quiz.findOneAndUpdate({_id: quizID}, {$push: {"questions": {_id: questionID} } }, { new: true }).populate('questions')
      .then(updatedQuiz => {
        const foundQuestion = updatedQuiz['questions'].find(q => q._id == req.params.questionID)
        res.json(foundQuestion)
      })
      .catch(err => res.status(500).json({message: err.message}))
    }
  })
  .catch(err => res.status(500).json({message: err.message}))
})





router.put('/:quizID/remove/questions', async (req, res) => {
  const quizID = new mongoose.Types.ObjectId(req.params.quizID);
  const questionIDs = req.body.questionIDs

  try {
    const quiz = await Quiz.findById(quizID);

    if (!quiz) {
      res.status(404).json({
        message: `Couldnt find quiz with ID: ${quizID}`
      })
      return
    }

    const updatedQuestions = quiz.questions.filter(question => questionIDs.includes(question._id))
    const removedQuestions = quiz.questions.filter(question => !questionIDs.includes(question._id))

    if (updatedQuestions.length !== quiz.questions.length) {
      // at least one question was removed, so update the quiz
      const result = await Quiz.updateOne(
        { _id: quizID },
        { $set: { questions: updatedQuestions } }
      );
    }
    
    else {
      res.status(404).json({ message: `None of the given question IDs match, so there is no any update` })
      return
    }

    res.json({ removedQuestionIDs: removedQuestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





router.put('/:id', async (req, res) => {
  const quizID = req.params.id;
  let { name, addTasks, removeTasks } = req.body;

  try {
    let updatedQuiz

    if (addTasks) {
      addTasks = addTasks.map(qID => new mongoose.Types.ObjectId(qID));
      const updateObj = { $addToSet: { questions: { $each: addTasks } } }
      if (name) updateObj.$set = { name }
      updatedQuiz = await Quiz.findByIdAndUpdate(quizID, updateObj, { new: true }).populate('questions');
    }

    if (removeTasks) {
      removeTasks = removeTasks.map(qID => new mongoose.Types.ObjectId(qID));
      const updateObj = { $pull: { questions: { $in: removeTasks } } }
      if (name && !addTasks) updateObj.$set = { name }
      updatedQuiz = await Quiz.findByIdAndUpdate(quizID, updateObj, { new: true }).populate('questions');
    }

    if (!updatedQuiz) res.status(404).json({ message: `Quiz with ID: ${quizID} not found.` });
    else res.json(updatedQuiz)

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





router.delete('/:id', (req, res) => {
  Quiz.findByIdAndRemove(req.params.id)
    .then(deletedQuiz => res.json(deletedQuiz))
    .catch(err => res.json({
      message: err
    }))
})




module.exports = router;
