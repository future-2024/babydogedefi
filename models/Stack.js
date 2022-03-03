const mongoose = require('mongoose');

const StackSchema = new mongoose.Schema({
  stackIndex: {
    type: Number,
    // required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
  },
  stackAmount: {
    type: Number
  },
  newFlag: {
    type: Boolean
  },
  waitStatus: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('stacks', StackSchema);
