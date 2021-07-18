import { React, useState, useEffect } from 'react';

import { Divider, InputNumber } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import StarRatings from 'react-star-ratings';
import Ratings from 'react-ratings-declarative';
import './Single.css';

import {
  StarOutlined,
  EditOutlined,
} from '@ant-design/icons';

const foodData = require('./ExampleData.json');

let newFoodData = {
  ...foodData
}

console.log('first new food data')
const SingleRecipe = () => {
  const [favourite, setFavourite] = useState(false);
  const [ratio, setRatio] = useState(1);
  const [review, setReview] = useState(false);
  
  const updateFavourite = (value) => {
    setFavourite(favourite ? false : true);
    newFoodData = {
      ...foodData,
      isFavourite: !favourite
    }
    console.log('in fav', newFoodData)
    return (favourite ? false : true);
  }

  const updateList = (value) => {
    newFoodData = {
      ...foodData,
      editRatio: ratio,
      editServing: true
    }
    return +(value && value*ratio).toFixed(2);
  }


  const newAvg = (newValue) => {
    return (newFoodData.avgRating + (newValue - newFoodData.avgRating )/(newFoodData.reviewAmt + 1));
  }

  const updateRating = (newRating) => {
    setReview(review ? false : true);
    // console.log(newRating, newFoodData.haveReview)
    // console.log(newFoodData)
    if (!newFoodData.haveReview){
      console.log('after')

      let totalReview = newFoodData.reviewAmt + 1;
      newFoodData = {
        ...foodData,
        haveReview: true,
        reviewAmt: totalReview,
        newRating: newAvg(newRating).toFixed(2)
      }
    }
    console.log('in update', newFoodData)
  }

  return (
    <div className='SingleContainer' style={{ margin:"10px 100px 0px 300px" }}>
      <div className='TitleContainer'>
        <h1>
          Recipe Name
        </h1>
        <StarOutlined className='starIcon'
          style={favourite ? {color:'#1C94FC'} : {color:'black'}}
          onClick={(value) => updateFavourite(value)}
          />
      </div>
        <Divider style={{ marginTop:5, marginBottom:0}}/>
        <div className='underDivider'>
          <div className="Slogan">
            {newFoodData.slogan}
          </div>
          <div className="editContainer">
            <EditOutlined style={{marginRight:5}}/>
            Edit
          </div>
        </div>
        <Carousel className="imageGallery" style={{marginTop:100}}>
          {newFoodData.pictureData && newFoodData.pictureData.map((data, index) => (
            <div>
              <img src={data.url} alt={index} />
              <p className="legend">{data.name}</p>
            </div>
          ))}

        </Carousel>
        <div className="bottomContainer">
          <div className="leftContainer">
            <div className='ServingAmt'>
              Servings:
              <InputNumber 
                min={1} 
                max={10000} 
                defaultValue={5} 
                onChange={(value) => setRatio(value / newFoodData.servingSize)}
                style={{
                  marginLeft:10,
                  width: 70
                }}
              />
            </div>
            <div className='Ratings'>
              <Ratings
                name="ratings"
                rating={newFoodData.avgRating}
                // rating={review ? newFoodData.newRating : newFoodData.avgRating}
                widgetRatedColors="#1C94FC"
                widgetHoverColors="#E6F7FF"
                widgetDimensions="25px"
                widgetSpacings="4px"
                changeRating={(value)=> updateRating(value)}
                // changeRating={(value)=> setReview(value)}
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
              {/* {console.log('after ratings', newFoodData)} */}
              <div className='ReviewAmt'>
                {/* {console.log('reviewamt/ have reviewed', newFoodData.reviewAmt, review)} */}
                {review ? newFoodData.reviewAmt +1 : newFoodData.reviewAmt} Review{((newFoodData.reviewAmt === 1 && review) || newFoodData.reviewAmt>1)? "s":null}
              </div>

            </div>
            <div className='IngredientList'>
              <h3 className='subHeader'>
                Ingredients:
                {newFoodData.ingredients && newFoodData.ingredients.map((data) => (
                  <div className='foodList'>
                    {updateList(data.amt)}
                    {data.type ? " "+data.type+" "+data.food : " "+data.food}
                  </div>
                ))}
              </h3>
            </div>
          </div>
          <div className="rightContainer">
            <h3 className='subHeader'>
              Directions
            </h3>
            the rest
          </div>

        </div>
        {console.log('main', newFoodData)}
    </div>
  );
};

export default SingleRecipe;