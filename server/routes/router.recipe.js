const express = require('express');
const mongoose = require('mongoose');
const RecipeModel = require('../models/Recipe');

const router = express.Router();
mongoose.set('useFindAndModify', false);

// Function to authenticate user, uncomment during testing or production
// router.use((req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({ error: 'Unauthorized' });
//     return;
//   }

//   next();
// });

router.get('/', async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    console.log('found recipes');
    res.send(recipes);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // faster to use find().limit(1) instead of findOne()
    const results = await RecipeModel.find({ recipeId: +id }).limit(1);
    const recipe = results[0];
    if (recipe) {
      console.log('recipe found');
      res.send(recipe);
    } else {
      const dne = 'no such recipe with this id';
      console.log(dne);
      res.json({ error: dne });
    }
  } catch (err) {
    console.log('no such recipe');
    res.json({ error: err.message });
  }
});

function splitIngredients(str) {
  const trimmedStr = str.trim();
  const blankIndexes = [];
  for (let i = 0; i < str.length; i++) {
    if (trimmedStr[i] === ' ') {
      blankIndexes.push(i);
    }
  }
  const quantity = +trimmedStr.slice(0, blankIndexes[0]);
  const unit = trimmedStr.slice(blankIndexes[0] + 1, blankIndexes[1]);
  const ingredient = trimmedStr.slice(blankIndexes[1] + 1, str.length);
  return { quantity, unit, ingredient };
}

router.post('/new', async (req, res) => {
  console.log('adding new recipe');
  try {
    const maxIdRecipe = await RecipeModel.find()
      .sort({ recipeId: -1 })
      .limit(1); // returns array
    const newId = +maxIdRecipe[0].recipeId + 1;
    const { query } = req;
    const postReq = {};
    console.log(query);
    postReq.category = query.category
      .replace(', ', ',')
      .replace(' ,', ',')
      .split(',');
    console.log(postReq);
    postReq.ingredients = query.ingredients
      .replace('\r', '')
      .split('\n')
      .map((item) => splitIngredients(item));
    postReq.directions = query.directions
      .replace(/[\r]/g, '')
      .split('\n')
      .filter((T) => T.length > 0);
    console.log(postReq.directions);
    postReq.votes = +1;
    postReq.recipeId = newId;
    postReq.time = {
      prepHour: query.prepHour,
      prepMin: query.prepMin,
      cookHour: query.cookHour,
      cookMin: query.cookMin,
    };
    postReq.meta = { votes: 1, rating: query.rating };
    postReq.url = query.url;
    console.log(postReq);
    const recipe = await RecipeModel.create(postReq);
    if (recipe) {
      console.log('recipe inserted successfully');
      res.json(recipe);
    } else {
      console.log('fail to add new recipe');
    }
  } catch (err) {
    console.log('error, cant create new recipes');
    res.json({ error: err.message });
  }
});

// router.patch('/:id', async (req, res) => {
// not implemented yet
// });

router.delete('/delete/:id', async (req, res) => {
  console.log(req.params);
  const query = { _id: mongoose.Types.ObjectId(req.params.id) };
  try {
    const recipe = await RecipeModel.findOneAndRemove(query);
    if (recipe) {
      console.log('recipe deleted successfully');
      res.json(recipe);
    } else {
      console.log('fail to delete recipe');
    }
  } catch (err) {
    console.log('error, cant delete recipe');
    res.json({ error: err.message });
  }
});

module.exports = router;
