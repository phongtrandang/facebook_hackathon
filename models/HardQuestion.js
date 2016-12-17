const mongoose = require('mongoose');

const hardQuestionSchema = mongoose.Schema({
  content: String,
  facebook : {
    id: String,
    name: String
  },
});

module.exports = mongoose.model('HardQuestion', hardQuestionSchema);
