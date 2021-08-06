const mongoose = require('mongoose');

const { Schema } = mongoose;

const shoppingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  recipes: [Number],
});

const Shopping = mongoose.model('shopping', shoppingSchema);

module.exports = Shopping;
