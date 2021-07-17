const recipes = [
  {
    name: 'Something yummy',
    type: 'Soup',
    cuisine: 'East Indian',
    ingredients: ['Chicken', 'Carrots', 'Rice', 'Salt', 'Peanuts'],
    directions: ['Boil chicken in water 20 minutes', 'Do something'],
  },
  {
    name: 'Something yummy2',
    type: 'Something',
    cuisine: 'Japanese',
    ingredients: ['Chicken', 'Carrots', 'Rice', 'Salt', 'Peanuts'],
    directions: ['Boil chicken in water 20 minutes', 'Do something'],
  },
];

function getAllRecipes() {
  return recipes;
}

function getOneRecipe(id) {
  return recipes[id];
}

module.exports = {
  getAllRecipes,
  getOneRecipe,
};
