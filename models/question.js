const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  content: String,
  type: {
    type: String,
    enum: ['GOSSIP', 'SOCIAL', 'DIAGNOSE', 'SOLUTION'],
    default: 'GOSSIP'
  },
});

module.exports = mongoose.model('Question', questionSchema);