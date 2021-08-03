import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Ratings from 'react-ratings-declarative';
import './Single.css';
import Timer from '../Timer/Timer';
import GetTimes from '../Timer/GetTimes';

import { Divider, InputNumber, Button, Modal } from 'antd';

import {
  StarOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from '@ant-design/icons';

const SingleRecipe = () => {
  const [newFoodData, setNewFoodData] = useState(null);
  const [isVisible, setVisible] = useState(false);
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
        haveReview: false,
        newRating: null,
      };
      setNewFoodData(tempinit);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
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

  const updateList = (value) => {
    if (!value) {
      return 0;
    }
    return +(value && value * newFoodData.editRatio).toFixed(2);
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
    return (
      (
        newFoodData.meta.rating +
        (newValue - newFoodData.meta.rating) / (newFoodData.meta.votes + 1)
      )
        .toFixed(2)
    );
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

  const DisplayTime = (hour, minute) => {
    let time = '';
    let extra = 0;
    if (minute > 60) {
      extra = Math.floor(minute/60);
      hour += extra;
    }
    if (hour !== 0) {
      time += hour + ' hr';
    }
    if (hour > 1) {
      time += 's';
    }
    if (minute !== 0) {
      if (extra) {
        minute -= extra*60;
      }
      time += ' ' + minute + ' min';
    }
    if (minute > 1) {
      time += 's';
    }
    if (time === '') {
      time = 0 + ' mins';
    }
    return time;
  };

  if (!newFoodData) {
    return null;
  }
  const getTimeArr = () => {
    let numArr = GetTimes(newFoodData.directions);
    return numArr;
  }

  return (
    <div
      className="SingleContainer"
      style={{
        margin: '10px 100px 0px 300px',
      }}
    >
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
        <StarOutlined
          className="starIcon"
          style={
            newFoodData.isFavourite ? { color: '#1C94FC' } : { color: 'black' }
          }
          onClick={(value) => updateFavourite(value)}
        />
      </div>
      <Divider style={{ marginTop: 5, marginBottom: 0 }} />
      <div className="underDivider">
        <Button
          type="link"
          href={newFoodData.url}
          style={{
            fontSize: 'large',
            paddingLeft: 0,
            fontStyle: 'italic'
          }}
        >
          @{newFoodData.url}
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
          <img src={newFoodData.imageUrl} alt={newFoodData.name} />
          <p className="legend">{newFoodData.name}</p>
        </div>
      </Carousel>
      <div className="bottomContainer">
        <div className="leftContainer">
          <div className="ServingAmt">
            Servings:
            <InputNumber
              min={1}
              max={10000}
              defaultValue={newFoodData.servingSize}
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
              {console.log(newFoodData)}
              {(newFoodData.haveReview && newFoodData.meta)
                ? newFoodData.meta.votes + 1
                : newFoodData.meta
                ? newFoodData.meta.votes
                : 0}{' '}
              Review
              {(newFoodData.meta.votes === 1 && newFoodData.haveReview) ||
              newFoodData.reviewAmt > 1
                ? 's'
                : null}
            </div>
          </div>
          <div className="IngredientList">
            <h3 className="subHeader">
              Ingredients:
              {newFoodData.ingredients &&
                newFoodData.ingredients.map((data) => (
                  <div className="foodList">
                    {updateList(data.quantity)}
                    {data.unitOfMeasure
                      ? ' ' + data.unitOfMeasure + ' ' + data.description
                      : ' ' + data.description}
                  </div>
                ))}
            </h3>
          </div>
        </div>
        <div className="rightContainer">
          <div className="Timer">
            <div className="TimeName">
              Prep Time
              <div className="TimeNumber">
                {DisplayTime(newFoodData.time.prepHour, newFoodData.time.prepMin)}
              </div>
            </div>
            <div className="TimeName">
              Cook Time
              <div className="TimeNumber">
                {DisplayTime(newFoodData.time.cookHour, newFoodData.time.cookMin)}
              </div>
            </div>
            <div className="TimeName">
              Total Time
              <div className="TimeNumber">
                {DisplayTime(
                  newFoodData.time.prepHour + newFoodData.time.cookHour,
                  newFoodData.time.prepMin + newFoodData.time.cookMin
                )}
              </div>
            </div>
            <Button
              size="large"
              onClick={showModal}
              style={{
                fontSize: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 200,
                position: 'absolute',
                right: 100,
              }}
              icon={
                <PlusOutlined
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    fontSize: 'small',
                  }}
                />
              }
            >
              In-App Timer
            </Button>
            <Modal
              title="Timers"
              onCancel={handleClose}
              visible={isVisible}
              footer={[
                <Button key="ok" onClick={handleClose} type="primary">
                  OK
                </Button>,
              ]}
            >
              {getTimeArr().map(data =>{
                return (
                  <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{marginRight:10, fontSize:15}}>{'STEP ' +(data[1]+1)+ ": "}</div> 
                    <Timer time={data[0]}/> 
                  </div>
                );
              })}
              {/* {getTimeArr() || 'No Timers Found'} */}
            </Modal>
          </div>
          <h3 className="subHeader">Directions</h3>
          <ol>
            {newFoodData.directions &&
              newFoodData.directions.map((data, index) => (
                <li className="directionContainer">
                  <div className="stepNumber">{index + 1}</div>
                  <div className="stepContent">{data}</div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
