const Multer = require('multer');
const mongoose = require('mongoose');
const parseIngredient = require('parse-ingredient');
const RecipeModel = require('../models/Recipe');

// const router = express.Router();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.set('useFindAndModify', false);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 megabytes
  },
});

module.exports = (app) => {
  app.get('/', async (req, res) => {
    try {
      const recipes = await RecipeModel.find();
      console.log('found recipes');
      res.send(recipes);
    } catch (err) {
      res.json({ error: err.message });
    }
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
      postReq.imageUrl = query.imageUrl;
      console.log(postReq);
      const recipe = await RecipeModel.create(postReq);
      if (recipe) {
        console.log('recipe inserted successfully');
        // res.json(recipe.id);
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

  app.get('/:id', async (req, res) => {
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

  app.delete('/:id', async (req, res) => {
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

  // module.exports = router;
};
