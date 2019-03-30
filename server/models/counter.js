const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  name:{
    type: String,
    default: 'name'
  },
  count: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Counter', CounterSchema);