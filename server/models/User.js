const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  displayName: String,
  recipesOwned: [String],
  recipesStarred: [String],
});

const User = mongoose.model('users', mongoSchema);

module.exports = User;
