const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hoifr.mongodb.net/recipes?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;
const app = express();
const client = new MongoClient(url);

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  await client.connect();
});

// http://localhost:4000/all_recipes
app.get('/all_recipes', async (req, res) => {
  const recipes = [];
  await client.db('recipes').collection('recipe-list').find().forEach((recipe) => recipes.push(recipe));
  res.json(recipes);
});

// http://localhost:4000/recipe/1
app.get('/recipe/:id', async (req, res) => {
  const query = { id: +req.params.id };
  console.log(query);
  const recipe = await client.db('recipes').collection('recipe-list').findOne(query);
  if (recipe) {
    console.log('recipe found');
    res.json(recipe);
  } else {
    console.log('no such recipe');
  }
});

/*
http://localhost:4000/new_recipe?recipeName=coffee&recipeIngredients=1+cup+water%0D%0A2+tbsp+coffee&prepTimeHour=0&prepTimeMin=5&cookTimeHour=0&cookTimeMin=3&servingSize=1&rating=5&recipeSteps=use+coffee+machine&recipeURL=starbucks.com
*/
app.post('/new_recipe', async (req, res) => {
  const ids = [];
  await client.db('recipes').collection('recipe-list').find().forEach((recipe) => ids.push(recipe.id));
  const newId = Math.max(...ids) + 1;
  const { query } = req;
  query.recipeIngredients = query.recipeIngredients.replace('\r', '').split('\n');
  query.recipeSteps = query.recipeSteps.replace('\r', '').split('\n');
  query.id = newId;
  console.log(query);
  const recipe = await client.db('recipes').collection('recipe-list').insertOne(query);
  if (recipe) {
    console.log('recipe inserted');
    res.json(recipe);
  } else {
    console.log('fail to add new recipe');
  }
});

/*
http://localhost:4000/recipe/60eef07fc9a3fc263e944118
 */
// note must be using _id and not simply id
app.delete('/delete/:id', async (req, res) => {
  console.log(req.params);
  const query = { _id: ObjectId(req.params.id) };
  const deleteRecipe = await client.db('recipes').collection('recipe-list').deleteOne(query);
  if (deleteRecipe) {
    console.log('recipe deleted');
    res.json(deleteRecipe);
  } else {
    console.log('fail to delete recipe');
  }
});

app.get('*', (req, res) => {
  console.log('no such page');
});
// await client.close();
