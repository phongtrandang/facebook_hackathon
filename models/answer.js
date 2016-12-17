const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  content: String,
  questions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
});

module.exports = mongoose.model('Answer', answerSchema);