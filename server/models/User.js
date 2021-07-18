const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  displayName: String,
  recipesOwned: [String],
  recipesStarred: [String],
});

const User = mongoose.model('users', mongoSchema);

module.exports = User;
