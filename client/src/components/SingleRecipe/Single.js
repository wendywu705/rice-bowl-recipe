import { React, useState, useEffect, useToggle } from 'react';

import { Divider, InputNumber  } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import StarRatings from 'react-star-ratings';
import './Single.css';

import {
  StarOutlined,
  StarFilled,
  EditOutlined,
} from '@ant-design/icons';
import { mapLimit } from 'async';


const SingleRecipe = () => {
  const [favourite, setFavourite] = useState(false);

  // number of reviews 
  let reviewNum = 55;
  // image data
  const pictureData = [
    {
      url: "https://www.carolinescooking.com/wp-content/uploads/2019/07/Japanese-milk-bread-tin-photo.jpg",
      name: 'Bread 1'
    },
    {
      url: "https://www.carolinescooking.com/wp-content/uploads/2021/01/Japanese-milk-bread-featured-pic-sq.jpg",
      name: 'Bread 2'
    },
    {
      url: "https://www.carolinescooking.com/wp-content/uploads/2019/07/Japanese-milk-bread-tin-picture.jpg",
      name: 'Bread 3'
    }
  ]
  const foodData =[
    {
      amt: 300,
      type: 'g',
      food: 'bread flour'
    },
    {
      amt: 2,
      type: 'tsp',
      food: 'fast acting yeast'
    },
    {
      amt: 120,
      type: 'ml',
      food: 'milk'
    },
    {
      amt: 30,
      type: 'g',
      food: 'unsalted butter'
    },
    {
      amt: 1,
      type: 'tsp',
      food: 'salt'
    },
    {
      amt: 3, 
      type: 'tbsp',
      food: 'sugar'
    },
    {
      amt: 1,
      type: null,
      food: 'egg'
    }
  ]

  return (
    
    <div className='SingleContainer' style={{ margin:"10px 100px 0px 300px" }}>
      <div className='TitleContainer'>
        <h1>
          Recipe Name
        </h1>
        <StarOutlined className='starIcon'
          style={favourite ? {color:'#1C94FC'} :  {color:'black'}}
          onClick={() => setFavourite(favourite ? false:true)}
          />
      </div>
        <Divider style={{ marginTop:5, marginBottom:0}}/>
        <div className='underDivider'>
          <div className="Slogan">
            Recipe Slogan Goes Here
          </div>
          <div className="editContainer">
            <EditOutlined style={{marginRight:5}}/>
            Edit
          </div>
        </div>
        {/* Single Recipe goes here */}
        <Carousel className="imageGallery" style={{marginTop:100}}>
          {pictureData && pictureData.map((data, index) => (
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
                style={{
                  marginLeft:10,
                  width: 70
                }}
              />
            </div>
            <div className='Ratings'>
              <StarRatings
                className='starRating'
                rating={3.5}
                starRatedColor='#1C94FC'
                starHoverColor='#E6F7FF'
                starDimension='25px'
                starSpacing='4px'
                // changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'           
              />
              <div className='ReviewAmt'>
                {reviewNum} Reviews
              </div>

            </div>
            <div className='IngredientList'>
              <h3 className='subHeader'>
                Ingredients:
                {foodData && foodData.map((data) => (
                  <div className='foodList'>
                      {data.amt} {data.type ? data.type+" "+data.food : data.food }
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
    </div>
  );
};

export default SingleRecipe;