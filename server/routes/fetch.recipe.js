const express = require('express');
const mongoose = require('mongoose');
const RecipeModel = require('../models/Recipe');

mongoose.set('useFindAndModify', false);

const router = express.Router();

// Fetch all the recipe names from db model
router.get('/', (req, res) => {
  const query = RecipeModel.find({}).select({ name: 1, _id: 0 });

  query.exec((error, data) => {
    if (error) throw error;
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].name);
    }
    res.json(data);
  });
});

module.exports = router;
