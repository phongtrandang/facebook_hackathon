const express = require('express');
const router = express.Router();
const Question = require('../../models/question');

router.get('/', (req, res) => {
  Question.find({}, function(err, questions) {
    res.send(questions);
  });
});

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
  });
});

router.post('/', (req, res) => {
  var question = new Question({
    content: req.body.content
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

module.exports = router;