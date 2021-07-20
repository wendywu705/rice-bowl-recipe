import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Ratings from 'react-ratings-declarative';
import './Single.css';

import { Divider, InputNumber, Button, Modal } from 'antd';

import {
  StarOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined,
} from '@ant-design/icons';

const foodData = require('./ExampleData.json');
const initData = require('./initData.json');

const hello = {
  time: {
    prepHour: 0,
    prepMin: 0,
    cookHour: 0,
    cookMin: 0,
  },
  meta: {},
  directions: [],
  category: [],
  _id: '',
  ingredients: [{}],
  hidden: null,
  name: '',
  recipeId: null,
  url: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
  imageUrl: '',
};

const SingleRecipe = () => {
  // const [newFoodData, setNewFoodData] = useState({ ...hello });
  // const [newFoodData, setNewFoodData] = useState({ ...foodData });
  const [newFoodData, setNewFoodData] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [foodTime, setFoodTime] = useState('');
  const [steps, setSteps] = useState('');
  const { id } = useParams();
  // const foodTime = newFoodData.time[0];
  console.log(newFoodData);

  useEffect(() => {
    console.log('id:', id);
    fetchSingleRecipe();

    if (newFoodData) {
      setFoodTime(newFoodData.time);
      setSteps(newFoodData.directions);
    }
  }, []);

  // if (newFoodData !== undefined) {
  //   console.log('newrecipe\n', newFoodData);
  //   setNewFoodData(newFoodData);
  // }

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
      // setNewFoodData(body);
      console.log('here is recipe:', body);
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
    // let newfav = !newFoodData.isFavourite;
    let tempfav = {
      ...newFoodData,
      isFavourite: newfav,
    };
    setNewFoodData(tempfav);
    console.log('inside update fav:', newFoodData);
    return newfav;
  };

  const updateList = (value) => {
    console.log('in update', value, newFoodData.editRatio);
    if (!value) {
      return 0;
    }
    console.log('updatelist', value);
    return +(value && value * newFoodData.editRatio).toFixed(2);
  };

  const updateRatio = (value) => {
    let templist = {
      ...foodData,
      // REMEMBER TO CHANGE
      editRatio: value / newFoodData.servingsize,
      // editRatio: value / newFoodData.servingSize,
      editServing: true,
    };
    setNewFoodData(templist);
  };

  const newAvg = (newValue) => {
    return (
      (
        newFoodData.rating +
        // newFoodData.avgRating +
        (newValue - newFoodData.rating) / (newFoodData.votes + 1)
      )
        // (newValue - newFoodData.avgRating) / (newFoodData.reviewAmt + 1)
        .toFixed(2)
    );
  };

  const updateRating = (newRating) => {
    //    :( everything not workingg ; ; ERRORS EVRYWHERE
    // T_T ya ya :( :(
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
    if (hour !== 0) {
      time += hour + ' hr';
    }
    if (hour > 1) {
      time += 's';
    }
    if (minute !== 0) {
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

  return (
    <div
      className="SingleContainer"
      style={{
        margin: '10px 100px 0px 300px',
      }}
    >
      {/* {console.log('inside divvy', newFoodData)} */}
      <Button
        type="link"
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
        <div className="Slogan">{newFoodData.slogan}</div>
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
          {/* {newFoodData.imageUrl} */}
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
              defaultValue={5}
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
            {/* {console.log('ratings', newFoodData)} */}
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
              {newFoodData.haveReview && newFoodData.meta
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
                    {/* {console.log('quantity', data.quantity)} */}
                    {updateList(data.quantity)}
                    {/* {console.log('data type', data.unitOfMeasure)} */}
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
                {DisplayTime(foodTime.prepHour, foodTime.prepMin)}
              </div>
            </div>
            <div className="TimeName">
              Cook Time
              <div className="TimeNumber">
                {DisplayTime(foodTime.cookHour, foodTime.cookMin)}
              </div>
            </div>
            <div className="TimeName">
              Total Time
              <div className="TimeNumber">
                {DisplayTime(
                  foodTime.prepHour + foodTime.cookHour,
                  foodTime.prepMin + foodTime.cookMin
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
              title="Timers (WIP)"
              onCancel={handleClose}
              visible={isVisible}
              footer={[
                <Button key="ok" onClick={handleClose} type="primary">
                  OK
                </Button>,
              ]}
            >
              Timer would go here
              <Button
                style={{
                  position: 'absolute',
                  right: 30,
                }}
              >
                Start
              </Button>
            </Modal>
          </div>
          <h3 className="subHeader">Directions</h3>
          <ol>
            {console.log('steps', steps)}
            {steps &&
              steps.map((data, index) => (
                <li className="directionContainer">
                  <div className="stepNumber">{index + 1}</div>
                  <div className="stepContent">{data}</div>
                </li>
              ))}
          </ol>
        </div>
      </div>
      {console.log('main', newFoodData)}
    </div>
  );
};

export default SingleRecipe;
