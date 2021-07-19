const testRecipes = [
  {
    name: 'Chicken Soup',
    category: ['East Indian', 'soup'],
    time: {
      prepHour: 1, prepMin: 22, cookHour: 2, cookMin: 14,
    },
    meta: { votes: 2, rating: 4 },
    servingSize: 5,
    ingredients: [{ quantity: 1, unit: 'unit', ingredient: 'Chicken' }, { quantity: 2, unit: 'cup', ingredient: 'Carrots' },
      { quantity: 3, unit: 'kilos', ingredient: 'Rice' }, { quantity: 1, unit: 'tbsp', ingredient: 'Salt' },
      { quantity: 5, unit: 'unit', ingredient: 'Peanuts' }],
    directions: ['Boil chicken in water 20 minutes', 'Do something'],
    url: 'https://youtu.be/dQw4w9WgXcQ',
    recipeId: 1001,
  },
  {
    name: 'Something yummy2',
    category: ['Japanese', 'sushi'],
    time: {
      prepHour: 2, prepMin: 35, cookHour: 1, cookMin: 22,
    },
    meta: { votes: 1000, rating: 3 },
    servingSize: 3,
    ingredients: [{ quantity: 1, unit: 'unit', ingredient: 'Chicken' }, { quantity: 2, unit: 'cup', ingredient: 'Carrots' },
      { quantity: 3, unit: 'kilos', ingredient: 'Rice' }, { quantity: 1, unit: 'tbsp', ingredient: 'Salt' },
      { quantity: 5, unit: 'unit', ingredient: 'Peanuts' }],
    directions: ['Boil Fish in water 20 minutes', 'Do something2'],
    url: 'https://youtu.be/EGeNKGosXA8',
    recipeId: 201,
  },
];

function getAllRecipes() {
  return testRecipes;
}

function getOneRecipe(id) {
  return testRecipes[id];
}

module.exports = {
  getAllRecipes,
  getOneRecipe,
};
