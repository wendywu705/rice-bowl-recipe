const Multer = require('multer');
const mongoose = require('mongoose');
const parseIngredient = require('parse-ingredient');
const RecipeModel = require('../models/Recipe');
const recipeScraper = require("recipe-scraper");
const alert = require('alert');

mongoose.set('useFindAndModify', false);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 megabytes
  },
});

module.exports = (app) => {
  app.get('/recipe', async (req, res) => {
    try {
      const recipes = await RecipeModel.find();
      console.log('found recipes');
      res.send(recipes);
    } catch (err) {
      res.json({ error: err.message });
    }
  });

  // fetch Recipe names from db to Home page.
  app.get('/home', async (req, res) => {
    const query = RecipeModel.find({}).select({
      name: 1, _id: 0, imageUrl: 1, meta: 1, recipeId: 1,
    });

    query.exec((error, data) => {
      if (error) throw error;
      // for (let i = 0; i < data.length; i++) {
      //   console.log(data[i].imageUrl);
      // }
      res.json(data);
    });
  });

  app.post('/recipes/new', multer.single('file'), async (req, res) => {
    console.log('adding new recipe');
    try {
      const maxIdRecipe = await RecipeModel.find()
        .sort({ recipeId: -1 })
        .limit(1); // returns array
      const newId = +maxIdRecipe[0].recipeId + 1;
      const query = JSON.parse(req.body.data);
      console.log('q::::', query);
      const postReq = {};
      if (query.category) {
        postReq.category = query.category
          .replace(', ', ',')
          .replace(' ,', ',')
          .split(',');
      }
      if (query.ingredients) {
        postReq.ingredients = parseIngredient(query.ingredients.toLowerCase());
      }
      if (query.directions) {
        postReq.directions = query.directions
          .replace(/[\r]/g, '')
          .split('\n')
          .filter((T) => T.length > 0)
          .map((item) => item.trim());
      }
      postReq.hidden = !!query.hidden;
      postReq.name = query.name;
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
      postReq.imageUrl = query.imageUrl; // Embed the Google Cloud Storage image URL
      postReq.servingSize = +query.servingSize;
      console.log(postReq);
      const recipe = await RecipeModel.create(postReq);
      if (recipe) {
        console.log('recipe inserted successfully');
        res.json(newId);
      } else {
        console.log('fail to add new recipe');
      }
    } catch (err) {
      console.log('error, cant create new recipes');
    }
  });

  // router.patch('/:id', async (req, res) => {
  // not implemented yet
  // });

  app.get('/recipes/:id', async (req, res) => {
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

  app.delete('/recipes/:id', async (req, res) => {
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

  app.post('/parse',  async (req, res) => {
    console.log('Parse the URL to recipe');
 
    const maxIdRecipe = await RecipeModel.find()
      .sort({ recipeId: -1 })
      .limit(1); // returns array
    const newId = +maxIdRecipe[0].recipeId + 1;

    const postReq = {};
    const url_addr = req.body.url;
    console.log(url_addr);

    recipeScraper(url_addr).then(recipe => {
      console.log(recipe);
      if(recipe.tag){
        postReq.category = recipe.tag
          .replace(', ', ',')
          .replace(' ,', ',')
          .split(',');
      }
      postReq.name = recipe.name;
      postReq.recipeId = newId;
      postReq.hidden = false;
      var newIngre = [];
      for(var i = 0; i < recipe.ingredients.length; i++){
        newIngre[i] = recipe.ingredients[i].replace(',', '');
      }
      const formatIngre = newIngre.toString().split(',').join('\n');
      //console.log(formatIngre);
      postReq.ingredients = parseIngredient(formatIngre);
      var newInstruct = [];
      var index = 0;
      for(var n = 0; n < recipe.instructions.length; n++){
        if(recipe.instructions[n].length != 0){
          newInstruct[index] = recipe.instructions[n];
          index++;
        }
        
      }
      postReq.directions = newInstruct;

      postReq.time = {
        prepHour: recipe.time.total ? recipe.time.total.substring(0,1) : 0,
        cookHour: 0,
        prepMin: recipe.time.prep ? recipe.time.prep.replace(' mins', '') : 0,
        cookMin: recipe.time.cook ? recipe.time.cook.replace(' mins', '') : 0,
      };
      postReq.servingSize = recipe.servings;
      postReq.imageUrl = recipe.image;
      // console.log(postReq);

      const parseRecipe = RecipeModel.create(postReq);
      if (parseRecipe) {
        console.log('Parsed recipe inserted successfully');
      } else {
        console.log('Fail to parse new recipe');
      }
    }).catch(err => {
      alert('Error: Failed to parse domain, please entry a correct doman URL');
      throw err;
    })
  })
};
