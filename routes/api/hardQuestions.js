const express = require('express');
const router = express.Router();
const HardQuestion = require('../../models/HardQuestion');

router.get('/', (req, res) => {
  HardQuestion.find({}, function(err, hardQuestions) {
    res.json({
      status: 'success',
      data: hardQuestions
    });
  });
});

router.get('/:id', (req, res) => {
  HardQuestion.findOne({_id: req.params.id}, function(err, hardQuestion) {
    if(err){
      return res.json({
        status: 'error',
        data: 'Can not get question!'
      });
    }
    res.json({
      status: 'success',
      data: hardQuestion
    });   
  });
});

router.post('/', (req, res) => {
  const hardQuestion = new HardQuestion({
    content: req.body.content,
    facebook: {
      id: req.body.id,
      name: req.body.name
    },
  });

  hardQuestion.save(function(err, hardQuestion) {
    if(err){
      return res.json({
        status: 'error',
        data: 'Can not create question !'
      });
    }
    res.json({
      status: 'success',
      data: hardQuestion
    });
  });
});

router.delete('/:id', function(req, res) {
  HardQuestion.findOneAndRemove({ _id: req.params.id}, function(err) {
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