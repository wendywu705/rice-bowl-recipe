const mongoose = require('mongoose');

const { Schema } = mongoose;

const shortMealSchema = new Schema({
  recipeId: Number,
  name: String,
  category: [String],
  time: {
    cookHour: Number,
    cookMin: Number,
    prepHour: Number,
    prepMin: Number,
  },
  imageUrl: String,
});

const mealPlannerSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  weeks: [
    {
      dates: String,
      lists: [
        {
          listId: String,
          meals: {
            breakfast: [shortMealSchema],
            lunch: [shortMealSchema],
            dinner: [shortMealSchema],
          },
        },
      ],
    },
  ],
});

const MealPlanner = mongoose.model('mealplanner', mealPlannerSchema);

module.exports = MealPlanner;
