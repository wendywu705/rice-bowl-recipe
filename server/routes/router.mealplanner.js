const mongoose = require('mongoose');
const MealPlanner = require('../models/MealPlanner');

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

  app.get('/api/mealplanner', checkAuth, async (req, res) => {
    console.log(userId);
    try {
      const resp = await MealPlanner.find({ userId });
      console.log('resp', resp);
      res.json(resp);
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/api/mealplanner', checkAuth, async (req, res) => {
    console.log(userId);
    console.log(req.body.mealplanner);
    const weeks = req.body.mealplanner;
    const weekz = [
      {
        dates: '08012021to08072021',
        lists: [
          {
            listId: '0',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '1',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '2',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '3',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '4',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '5',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '6',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
        ],
      },
      // Next
      {
        dates: '08082021to08142021',
        lists: [
          {
            listId: '0',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '1',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '2',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '3',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '4',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '5',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
          {
            listId: '6',
            meals: {
              breakfast: [
                {
                  recipeId: '102',
                  name: 'Potato Soup',
                  category: ['Light', 'Breakfast'],
                  time: {
                    cookHour: 0.5,
                    cookMin: 0,
                    prepHour: 0.5,
                    prepMin: 0,
                  },
                  imageUrl:
                    'https://www.tasteofhome.com/wp-content/uploads/2018/01/Potato-Soup_EXPS_CWDJ17_44986_C08_19_5b-4.jpg',
                },
              ],
              lunch: [],
              dinner: [],
            },
          },
        ],
      },
    ];
    const filter = { userId };
    const update = { weeks };
    let resp = await MealPlanner.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.send(`Welcome user:${userId}`);
  });
};
