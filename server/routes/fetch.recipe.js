var express = require('express');
const mongoose = require('mongoose');
const RecipeModel = require('../models/Recipe');

mongoose.set('useFindAndModify', false);

var router = express.Router();

router.get('/', (req, res) => {
    console.log("get home page");
    var query = RecipeModel.find({}).select({"name": 1, "_id": 0});

    query.exec(function (error, data){
        if(error) throw error;
        for(let i = 0; i < data.length; i++){
            console.log(data[i].name);
            
        }
        // need to change to array later on
        res.send({ express: data[0].name });
    });
    
});

module.exports = router;