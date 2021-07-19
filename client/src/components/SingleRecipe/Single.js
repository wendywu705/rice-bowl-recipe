import { React, useState, useEffect } from 'react';

import { Divider, InputNumber, Button, Modal } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Ratings from 'react-ratings-declarative';
import './Single.css';

import {
  StarOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const foodData = require('./ExampleData.json');



const SingleRecipe = () => {
  const [newFoodData, setNewFoodData] = useState({...foodData});
  const [isVisible, setVisible] = useState(false);
  const foodTime = newFoodData.time[0];
  const steps = newFoodData.directions;
  // console.log('steps', steps)
  const handleOK = () => {
    setVisible(false);
  }
  const showModal = () => {
    setVisible(true);
  }

  const updateFavourite = (value) => {
    let newfav = !newFoodData.isFavourite
    let tempfav = {
      ...newFoodData,
      isFavourite: newfav
    }
    setNewFoodData(tempfav)
    return (newfav);
  }

  const updateList = (value) => {
    return +(value && value*newFoodData.editRatio).toFixed(2);
  }

  const updateRatio = (value) => {
    let templist = {
      ...foodData,
      editRatio: value / newFoodData.servingSize,
      editServing: true
    }
    setNewFoodData(templist)
  }

  const newAvg = (newValue) => {
    return (
      (newFoodData.avgRating + (newValue - newFoodData.avgRating )
      /(newFoodData.reviewAmt + 1)).toFixed(2)
    );
  }

  const updateRating = (newRating) => {
    let hasreview = newFoodData.haveReview
    let tempRating  = {
      ...newFoodData,
      haveReview: !hasreview,
      newRating: !hasreview ? Number(newAvg(newRating)) : null
    }
    setNewFoodData(tempRating)
  }

  const DisplayTime = (hour, minute) => {
    let time = "";
    if (hour !== 0) {
      time += hour+" hr"
    }
    if (hour > 1) {
      time += "s"
    }
    if (minute !== 0) {
      time += " "+minute+" min"
    }
    if (minute > 1) {
      time += "s"
    }
    if (time === "") {
      time = 0+" mins"
    }
    return time;
  }

  return (
    <div 
      className='SingleContainer' 
      style={{ 
        margin:"10px 100px 0px 300px" 
      }}
    >
      <div className='TitleContainer'>
        <h1>
          Recipe Name
        </h1>
        <StarOutlined className='starIcon'
          style={newFoodData.isFavourite ? {color:'#1C94FC'} : {color:'black'}}
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
                onChange={(value) => {updateRatio(value)}}
                style={{
                  marginLeft:10,
                  width: 70
                }}
              />
            </div>
            <div className='Ratings'>
              <Ratings
                name="ratings"
                rating={
                  (newFoodData.newRating && newFoodData.newRating) || 
                  (newFoodData.avgRating || 0)
                }
                widgetRatedColors="#1C94FC"
                widgetHoverColors="#E6F7FF"
                widgetDimensions="25px"
                widgetSpacings="3px"
                changeRating={(value) => updateRating(value)}
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
              <div className='ReviewAmt'>
                {newFoodData.haveReview ? newFoodData.reviewAmt+1 : newFoodData.reviewAmt}
                {" "}Review{
                  ((newFoodData.reviewAmt === 1 && newFoodData.haveReview) || 
                  newFoodData.reviewAmt>1 )? "s":null
                }
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
            <div className="Timer">
              <div className="TimeName">
                Prep Time
                {console.log(foodTime.prep)}
                <div className="TimeNumber">
                  {DisplayTime(
                    foodTime.prep[0].hour, 
                    foodTime.prep[0].minute
                  )}
                </div>
              </div>
              <div className="TimeName">
                Cook Time
                <div className="TimeNumber">
                  {DisplayTime(
                    foodTime.cook[0].hour, 
                    foodTime.cook[0].minute
                  )}
                </div>
              </div>
              <div className="TimeName">
                Total Time
                <div className="TimeNumber">
                  {DisplayTime(
                    foodTime.prep[0].hour + foodTime.cook[0].hour, 
                    foodTime.prep[0].minute + foodTime.cook[0].minute
                  )}
                </div>
              </div>
              <Button
                size='large'
                onClick={showModal}
                style={{
                  fontSize:'20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 200,
                  position:'absolute',
                  right:100
                }}
                icon={
                  <PlusOutlined 
                    style={{ 
                      display: 'inline-block', 
                      verticalAlign: 'middle',
                      fontSize: 'small'
                    }} 
                  />
                }
              >
                In-App Timer
              </Button>
              <Modal 
                title="Timers (WIP)" 
                onCancel={handleOK}
                visible={isVisible} 
                footer={[
                  <Button
                    key="ok"
                    onClick={handleOK}
                    type="primary"
                  >
                    OK
                  </Button>
                ]}
              >
                Timer would go here 
                <Button
                  style={{
                    position:'absolute',
                    right:30
                  }}
                >
                  Start
                </Button>
              </Modal>
            </div>
            <h3 className='subHeader'>
              Directions
            </h3>
            <ol>
              {console.log(steps)}
              {steps && steps.map((data, index) => (
                <li className="directionContainer">
                  <div className="stepNumber" >
                    {index+1}
                  </div>
                  <div className="stepContent">
                    {data}
                  </div>
                </li>
              ))}
            </ol>
            {/* the rest */}
          </div>

        </div>
        {console.log('main', newFoodData)}
    </div>
  );
};

export default SingleRecipe;