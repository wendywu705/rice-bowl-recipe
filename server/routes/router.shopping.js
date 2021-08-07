const Shopping = require('../models/Shopping');
const RecipeModel = require('../models/Recipe');

let userId;
module.exports = (app) => {
  const checkAuth = async (req, res, next) => {
    console.log('Current user is:', req.user);
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
      return res.status(401).json({
        error: 'You must be logged in!',
      });
    }
    console.log('Authed!');
    // eslint-disable-next-line no-underscore-dangle
    userId = req.user.googleId;
    next();
  };

  app.get('/api/shopping', checkAuth, async (req, res) => {
    // let resp = await Shopping.find({ userId });
    const resp = await Shopping.find({ userId });
    if (resp.length === 0) {
      console.log('user has no shopping cart');
      return res.json({});
    }
    const shoppingList = {};
    const list = resp[0].recipes;
    const reso = await RecipeModel.find().where('recipeId').in(list);

    for (const obj of reso) {
      if (obj.name in shoppingList) {
        shoppingList[obj.name].amt++;
      } else {
        shoppingList[obj.name] = {
          ingredients: obj.ingredients,
          amt: 0,
        };
      }
      console.log('hhh', shoppingList);
    }

    for (const meal of list) {
      for (const [k, v] of Object.entries(reso)) {
        if (meal === v.recipeId) {
          shoppingList[v.name].amt = shoppingList[v.name].amt + 1;
        }
      }
    }

    res.json(shoppingList);
  });

  app.post('/api/shopping', checkAuth, async (req, res) => {
    console.log('api shopping hit');
    const recipes = req.body.shopping;
    const filter = { userId };
    const update = { recipes };
    try {
      const resp = await Shopping.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });
    } catch (err) {
      console.log(err);
    }
    res.send('hello');
  });

  // app.get('/api/mealplanner', checkAuth, async (req, res) => {
  //   console.log(userId);
  //   try {
  //     const resp = await MealPlanner.find({ userId });
  //     console.log('resp', resp);
  //     res.json(resp);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  // app.post('/api/mealplanner', checkAuth, async (req, res) => {
  //   console.log(userId);
  //   console.log(req.body.mealplanner);
  //   const weeks = req.body.mealplanner;
  //   const filter = { userId };
  //   const update = { weeks };
  //   let resp = await MealPlanner.findOneAndUpdate(filter, update, {
  //     new: true,
  //   });
  //   res.send(`Welcome user:${userId}`);
  // });
};
