import { React, useState, useEffect, useToggle } from 'react';

import { Divider, InputNumber  } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import StarRatings from 'react-star-ratings';
import './Single.css';

import {
  StarOutlined,
  EditOutlined,
} from '@ant-design/icons';


const SingleRecipe = () => {
  const [favourite, setFavourite] = useState(false);
  const [ratio, setRatio] = useState(1);

  const foodData = {
    'servingSize' : 5,
    'editServing' : false,
    'editRatio' : null,
    'reviewAmt' : 99,
    'favourite' : false,
    'ingredients': 
    [
      {
        'amt': '300',
        'type': 'g',
        'food': 'bread flour'
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
    ],
    pictureData: [
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
  }
  const updateFavourite = () => {
    setFavourite(favourite ? false : true);
    foodData.favourite = favourite;
    console.log(foodData)
    
    if (favourite) {
      return false;
    }
    else {
      return true;
    }
  }
  const updateList = (value) => {
    foodData.editRatio = (value / foodData.servingSize);
    foodData.editServing = true;
    // console.log(foodData)

    return (+(value && value*ratio).toFixed(2));
  }
 
  return (
    
    <div className='SingleContainer' style={{ margin:"10px 100px 0px 300px" }}>
      {/* {console.log(foodData)} */}
      <div className='TitleContainer'>
        <h1>
          Recipe Name
        </h1>
        <StarOutlined className='starIcon'
          style={favourite ? {color:'#1C94FC'} : {color:'black'}}
          // onClick={() => {
          //   // foodData.favourite = favourite;
          //   setFavourite(favourite ? false : true); 
          //   // console.log(favourite)
            
          // }}
          onClick={updateFavourite}
          />
          {/* {console.log(foodData)} */}
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
        <Carousel className="imageGallery" style={{marginTop:100}}>
          {foodData.pictureData && foodData.pictureData.map((data, index) => (
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
                onChange={(value) => setRatio(value / foodData.servingSize)}
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
                numberOfStars={5}
                name='rating'           
              />
              <div className='ReviewAmt'>
                {foodData.reviewAmt} Reviews
              </div>

            </div>
            <div className='IngredientList'>
              <h3 className='subHeader'>
                Ingredients:
                {foodData.ingredients && foodData.ingredients.map((data) => (
                  <div className='foodList'>
                    {/* {console.log(data.amt)}
                    {console.log('list', updateList(data))} */}
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
    </div>
  );
};

export default SingleRecipe;