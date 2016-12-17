const express = require('express');
const router = express.Router();
const Question = require('../../models/question');
const Answer = require('../../models/answer');

router.get('/', (req, res) => {
  Answer.find({}, function(err, answers) {
    res.json({
      status: "success",
      data: answers
    });
  })
})

router.get('/:id', (req, res) => {
  Answer.findOne({_id: req.params.id}, function(err, answer) {
    res.json({
      status: "success",
      data: answer
    });
  })
})

router.get('/:questionId/', (req, res) => {
  Answer.find({
    questions: req.params.questionId
  })
  .populate('questions')
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
  })
})

router.post('/:questionId/create', (req, res) => {
    var answer = new Answer({
        content: req.body.content,
        questions: req.params.questionId,
    });
    answer.save(function(err, answer) {
      if(err){
        res.json({
          status: 'error',
          message: "Can not create answer !"
        })
      }else {
        res.json({
          status: 'success',
          data: answer
        });}
    });
})

router.delete('/:id', function(req, res) {
  Answer.findOneAndRemove({ _id: req.params.id}, function(err) {
    if (err) {
      res.json({
        status: 'error',
        data: 'Can not delete answer'
      })
    }
      else {
        res.json({
          status: 'success',
          data: 'Deleted one answer !'
        });
      }
  });
});

router.put('/:id', function(req, res){
  Answer.findOne({ _id: req.params.id }, function (err, answer){
    if(err) {
      res.json({
        status: 'fail',
        message: 'Can not update this answer !'
      })
    }
    else
    {
        answer.content = req.body.content;
        answer.save();
        res.json({
          status: 'success',
          data: answer
        });
    }
  });
})

module.exports = router;