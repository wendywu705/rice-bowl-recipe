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
    const filter = { userId };
    const update = { weeks };
    let resp = await MealPlanner.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.send(`Welcome user:${userId}`);
  });
};
