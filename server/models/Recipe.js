const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Recipe = mongoose.model('Recipe', mongoSchema);

module.exports = Recipe;
