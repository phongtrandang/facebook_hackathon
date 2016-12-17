const express = require('express');
const router = express.Router();
const Question = require('../../models/question');
const Answer = require('../../models/answer');

router.get('/', (req, res) => {
  Question.find({}, function(err, questions) {
    res.send(questions);
  })
})

router.get('/:id', (req, res) => {
  Question.find({
    _id: req.params.id,
  })
  .lean()
  .then(question => {
    res.json({
      status:'success',
      data: question
    });
  })
  .catch(error => {
    res.json({
      status: 'error',
      message: error
    });
  })
})

router.post('/', (req, res) => {
    var question = new Question({
        content: req.body.content
    });
    question.save(function(err, question) {
      if(err) console.log(err)
        else console.log(question)
    });
    res.json('Create 1 question for nothing');
})

module.exports = router;