const express = require('express');
const recipesDB = require('../test/RecipesDB');

const router = express.Router();

// Authenticate user
// router.use((req, res, next) => {

// })

router.get('/', async (req, res) => {
  try {
    const recipes = await recipesDB.getAllRecipes();
    console.log(recipes);
    res.send(recipes);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipesDB.getOneRecipe(id);
    console.log(recipe);
    res.send(recipe);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
