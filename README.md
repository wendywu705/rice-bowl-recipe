<br />
<p align="center">
  <a href="./public/images/white_blue_bg.png">
    <img width="100%" src="./public/images/white_blue_bg.png" alt="ricebowl logo">
  </a>

  <h3 align="center">A web application for analyzing collecting food recipes.</h3>

  <p align="center">
    Built for Simon Fraser University course CMPT 470.
    <br />
    <a href="https://csil-git1.cs.surrey.sfu.ca/xza172/rice-bowl-recipe/-/blob/master/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://csil-git1.cs.surrey.sfu.ca/xza172/rice-bowl-recipe/-/blob/master/README.md">View Demo</a>
    ·
    <a href="https://csil-git1.cs.surrey.sfu.ca/xza172/rice-bowl-recipe/-/issues">Report Bug</a>
    ·
    <a href="https://csil-git1.cs.surrey.sfu.ca/xza172/rice-bowl-recipe/-/issues">Request Feature</a>
  </p>
</p>

## 📖 Project Overview

Rice bowl app collects the world's food recipes, provides a wealth of home recipes and the recipes throughout the country. Every page has exquisite food pictures, tutorial videos and detailed cooking steps. You can also add the ingredients you need into the shopping cart for home delivery. It will be an excellent helper for you to make a great meal!

## 📝 Project Roadmap [Features]

- Create and import recipes from other sites
- Add ingredients and directions
- Easy ingredient conversions
- Share and export recipes
- In-recipe timer
- Grocery cart and pantry (auto shopping)
- Calendar and meal planner
- Photos and videos recipes
- Categorization of recipes
- Pinned recipes
- User-customized settings
- Search bar and sorting
- Export to MyFitnessPal and calorie tracker site

## ⚡️ Quick start

First of all, [download](https://nodejs.org/en/) and install **Node.js**. Version `14.7.0 LTS` or higher is recommended.

**Clone directory:**

```bash
$ git clone https://csil-git1.cs.surrey.sfu.ca/xza172/rice-bowl-recipe.git
```

**Frontend:**

```bash
# Change directory:
$ cd rice-bowl-recipe/client/

# Installation:
$ npm install

# Start client server:
$ npm start
```

**Backend:**

```bash
# Change directory:
$ cd rice-bowl-recipe/server/

# Installation:
$ npm install

# Start backend server:
$ npm start
```

Then navigate to **[http://localhost:3000/](http://localhost:3000/)** on your browser.

## 🐳 Docker-way to quick start

Make sure you have [installed docker and docker-compose](https://docs.docker.com/compose/install/) on your computer

**Clone directory:**

```bash
$ git clone https://csil-git1.cs.surrey.sfu.ca/xza172/rice-bowl-recipe.git
```

**Run:**

```bash
# Change directory:
$ cd rice-bowl-recipe/

# Run:
$ ./start.sh

# Or if you need sudo previleges:
$ sudo bash ./start.sh
```

Then navigate to **[http://localhost:3000/](http://localhost:3000/)** on your browser.

## Linting with ESLINT

To run linting on the `client` directory, call `npm run lint` in the root directory.
This will ensure a consistent code style for this project.

## CI/CD with Auto DevOps

This template is compatible with [Auto DevOps](https://docs.gitlab.com/ee/topics/autodevops/).

If Auto DevOps is not already enabled for this project, you can [turn it on](https://docs.gitlab.com/ee/topics/autodevops/#enabling-auto-devops) in the project settings.

## Developing with Gitpod

This template has a fully-automated dev setup for [Gitpod](https://docs.gitlab.com/ee/integration/gitpod.html).

If you open this project in Gitpod, you'll get all Node dependencies pre-installed and Express will open a web preview.
