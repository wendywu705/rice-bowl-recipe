import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Ratings from 'react-ratings-declarative';
import './Single.css';
import DisplayTimes  from './DisplayTime';
import ListDirections from './Directions';
import ListIngredients from './ListIngredients';
import InAppTimer from './AppTimer';
import App from '../PDF/genPDF';

import { Divider, InputNumber, Button } from 'antd';

import {
  EditOutlined,
  LeftOutlined,
  SaveOutlined,
  PushpinOutlined
} from '@ant-design/icons';

const SingleRecipe = () => {
  const [newFoodData, setNewFoodData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log('id:', id);
    fetchSingleRecipe();
  }, []);

  const fetchSingleRecipe = async () => {
    try {
      const recipeRes = await axios({
        method: 'get',
        timeout: 1000,
        url: `/recipes/${id}`,
      });
      const body = recipeRes.data;
      let tempinit = {
        ...body,
        editRatio: 1,
        isFavourite: false,
        isPinned: false,
        haveReview: false,
        newRating: null,
      };
      setNewFoodData(tempinit);
    } catch (err) {
      console.log(err);
    }
  };



  const updateFavourite = (value) => {
    let newfav;
    if (newFoodData.isFavourite == null) {
      newfav = false;
    } else {
      newfav = !newFoodData.isFavourite;
    }
    let tempfav = {
      ...newFoodData,
      isFavourite: newfav,
    };
    setNewFoodData(tempfav);
    return newfav;
  };
  const updatePinned = (value) => {
    let newpin;
    if (newFoodData.isPinned == null) {
      newpin = false;
    } else {
      newpin = !newFoodData.isPinned;
    }
    let temppin = {
      ...newFoodData,
      isPinned: newpin,
    };
    setNewFoodData(temppin);
    return newpin;
  };

  const updateRatio = (value) => {
    let templist = {
      ...newFoodData,
      editRatio: value / newFoodData.servingSize,
      editServing: true,
    };
    setNewFoodData(templist);
  };

  const newAvg = (newValue) => {
    if (newFoodData && newFoodData.meta) {
      return (
        (
          newFoodData.meta.rating +
          (newValue - newFoodData.meta.rating) / (newFoodData.meta.votes + 1)
        )
          .toFixed(2)
      );
    }
  };

  const updateRating = (newRating) => {
    let hasreview = newFoodData.haveReview;
    let tempRating = {
      ...newFoodData,
      haveReview: !hasreview,
      newRating: Number(newAvg(newRating)),
    };
    setNewFoodData(tempRating);
  };

  const printUrl = (data) => {
    if (data && data.url){
      return data.url;
    }
    else return null;
  }

  const determineS = (data) => {
    if (data && data.meta) {
      if ((data.meta.votes === 1 && data.haveReview) || data.reviewAmt > 1) {
        return 's';
      }
    }
    return null;
  }

  const reviewNum = (data) => {
    let totalNum = 0;
    if (data) {
      if (data.meta) {
        totalNum = data.meta.votes
        if (data.haveReview) {
          totalNum = data.meta.votes + 1;
        }
      }
    }
    return totalNum + " "
  }
  const determineColor = (type) => {
    if (!newFoodData) {
      return null;
    }
    if (
      (type === 'fav' && newFoodData.isFavourite === true) || 
      (type === 'pin' && newFoodData.isPinned === true)
    ) {
      return '#1C94FC';
    } else {
      return 'grey';
    }
  }
  return (
    <div
      className="SingleContainer"
      style={{
        margin: '10px 100px 0px 300px',
      }}
    >
      {console.log(newFoodData)}
      <Button
        type="link"
        href={'/home'}
        icon={
          <LeftOutlined
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          />
        }
        style={{
          marginTop: 10,
          textAlign: 'left',
          paddingLeft: 0,
          fontSize: 20,
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Back to ALL
      </Button>
      <div className="TitleContainer">
        <h1 style={{ paddingTop: 10 }}>{newFoodData && newFoodData.name}</h1>
        <div>
          <Button
            shape="circle"
            className="circleButton"
            size="large"
            style={{ 
              display: 'inline-flex', 
              justifyContent: 'center', 
              alignItems: 'center',
            }}
            onClick={(value) => updateFavourite(value)}
            icon={
              <SaveOutlined
                className="circleIcon"
                style={{
                  color: determineColor('fav'),
                  fontSize:20
                }}
              />
            }
          >
          </Button>
          <Button
            shape="circle"
            className="circleButton"
            size="large"
            style={{ 
              display: 'inline-flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginLeft:10
            }}
            onClick={(value) => updatePinned(value)}
            icon={
              <PushpinOutlined
                className="circleIcon"
                style={{
                  color: determineColor('pin'),
                  fontSize:20
                }}
              />
            }
          >
          </Button>
        </div>
      </div>
      <Divider style={{ marginTop: 5, marginBottom: 0 }} />
      <div className="underDivider">
        <Button
        
          type="link"
          href={printUrl(newFoodData)}
          style={{
            fontSize: 'large',
            paddingLeft: 0,
            fontStyle: 'italic'
          }}
        >
          {"@"+printUrl(newFoodData)}
        </Button>
        <div className="editContainer">
          <Button
            type="link"
            icon={<EditOutlined />}
            style={{
              fontSize: '17px',
              lineHeight: '17px',
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <Carousel className="imageGallery" style={{ marginTop: 100 }}>
        {/* {newFoodData.pictureData &&
          newFoodData.pictureData.map((data, index) => (
            <div>
              <img src={data.url} alt={index} />
              <p className="legend">{data.name}</p>
            </div>
          ))} */}
        <div>
          <img src={newFoodData ? newFoodData.imageUrl :  null} alt={newFoodData ? newFoodData.name : null} />
          <p className="legend">{newFoodData ? newFoodData.name : null}</p>
        </div>
      </Carousel>
      <div className="bottomContainer">
        <div className="leftContainer">
          <div className="ServingAmt" key={newFoodData && newFoodData.servingSize}>
            Servings:
            <InputNumber
              min={1}
              max={10000}
              defaultValue={(newFoodData && newFoodData.servingSize)}
              onChange={(value) => {
                updateRatio(value);
              }}
              style={{
                marginLeft: 10,
                width: 70,
              }}
            />
          </div>
          <div className="Ratings">
            <Ratings
              name="ratings"
              rating={
                newFoodData && newFoodData.meta
                  ? newFoodData.newRating
                    ? newFoodData.newRating
                    : newFoodData.meta.rating
                  : 0
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
            <div className="ReviewAmt">
              {reviewNum(newFoodData)}
              Review
              {determineS(newFoodData)}
            </div>
          </div>
          <ListIngredients 
            ingredients={newFoodData && newFoodData.ingredients} 
            editRatio={newFoodData && newFoodData.editRatio}
            pdf={false}
          />
        </div>
        <div className="rightContainer">
          <div style={{display:'flex', paddingBottom:10}}>
            <DisplayTimes time={newFoodData && newFoodData.time} />
            <App 
              data={newFoodData}
              name={newFoodData && newFoodData.name} 
            />
          </div>
            <InAppTimer />
            <h3 className="subHeader">Directions</h3>
            <ListDirections 
              directions= {
                newFoodData && 
                newFoodData.directions
              }
            />
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;

