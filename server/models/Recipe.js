const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema({
  recipeId: Number,
  name: String,
  ingredients: [{ quantity: Number, unit: String, ingredient: String }],
  time: {
    prepHour: Number, prepMin: Number, cookHour: Number, cookMin: Number,
  },
  servingSize: Number,
  directions: [String],
  meta: {
    votes: { type: Number, default: 1 },
    rating: { type: Number, default: 5 },
  },
  url: String,
  category: [String],
}, { timestamps: true, versionKey: false });

const RecipeModel = mongoose.model('Recipe', mongoSchema, 'recipe-list');

module.exports = RecipeModel;
