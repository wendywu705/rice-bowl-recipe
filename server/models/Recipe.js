const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema(
  {
    recipeId: Number,
    name: String,
    ingredients: [
      {
        quantity: Number,
        quantity2: Number,
        unitOfMeasure: String,
        description: String,
        isGroupHeader: Boolean,
      },
    ],
    time: {
      prepHour: Number,
      prepMin: Number,
      cookHour: Number,
      cookMin: Number,
    },
    servingSize: Number,
    directions: [String],
    meta: {
      votes: { type: Number, default: 1 },
      rating: { type: Number, default: 5 },
    },
    hidden: Boolean,
    url: String,
    imageUrl: String, // URL of the image stored in Google Cloud Storage
    category: [String], // possibly change to lower case
  },
  { timestamps: true },
);

const RecipeModel = mongoose.model('Recipe', mongoSchema, 'recipeslist');

module.exports = RecipeModel;
