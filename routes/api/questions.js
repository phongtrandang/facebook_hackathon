const express = require('express');
const router = express.Router();
const Question = require('../../models/question');
const Answer = require('../../models/answer');

router.get('/', (req, res) => {
  Question.find({}, function(err, questions) {
    if(err){
      return res.json({
        status: 'error',
        data: 'Could not load questions !'
      });
    }
    res.json({
      status: 'success',
      data: questions
    });
  });
});

router.get('/:id', (req, res) => {
  Question.findOne({
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
  });
});

router.get('/allAnswer/:questionId/', (req, res) => {
  Answer.find({
    questions: req.params.questionId
  })
  .lean()
  .then(answer => {
    res.json({
      status:'success',
      data: answer,
    });
  })
  .catch(error => {
    res.json({
      status: 'error',
      message: error
    });
  });
});


router.post('/', (req, res) => {
  var question = new Question({
    content: req.body.content,
    type: req.body.type
  });

  question.save(function(err, question) {
    if(err) {
      return res.json({
        status: 'error',
        message: 'Can not create question !'
      });
    }
    res.json({
      status: 'success',
      data: question
    });
  });
});

router.delete('/:id', function(req, res) {
  Question.findOneAndRemove({ _id: req.params.id}, function(err) {
    if (err) {
      return res.json({
        status: 'error',
        data: 'Can not delete question'
      });
    }
    
    res.json({
      status: 'success',
      data: 'Deleted one question !'
    });

  });
});

module.exports = router;