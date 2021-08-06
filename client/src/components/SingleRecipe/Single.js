import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Ratings from 'react-ratings-declarative';
import InappTimer from '../Timer/DisplayTimer';
import DisplayTimes  from './DisplayTime';
import ListDirections from './Directions';
import ListIngredients from './ListIngredients';
import App from '../PDF/genPDF';
import axios from 'axios';
import './Single.css';
import '../Layout/Footer.css'
import { Link } from 'react-router-dom';


import { Divider, InputNumber, Button } from 'antd';

import {
  EditOutlined,
  LeftOutlined,
  SaveOutlined,
  PushpinOutlined
} from '@ant-design/icons';

// window.onload = function() {
//   console.log('location',window.location);
//   if(!window.location.hash && window.location.pathname.includes('/recipe/')) {
//     window.location = window.location + '#loaded';
//     window.location.reload();
//   }
// }

const SingleRecipe = () => {
  const [newFoodData, setNewFoodData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log('recipeId:', id);
    const checkSaved= async() =>{
      try{
        const savedResponse = await axios({
          method: 'get',
          timeout: 1000,
          url: `/saved/${id}`,
        });
        if ( [200, 304].includes(savedResponse.status) ){
          if (savedResponse.data === id){
            return true;
          }
        }
      } catch(err){
        console.log('err',err);
      }
      return false;
    }

    const checkPinned= async() =>{
      try{
        const savedResponse = await axios({
          method: 'get',
          timeout: 1000,
          url: `/pinned/${id}`,
        });
        if ( [200, 304].includes(savedResponse.status) ){
          if (savedResponse.data === id){
            return true;
          }
        }
      } catch(err){
        console.log('err',err);
      }
      return false;
    }

    const fetchSingleRecipe = async () => {
      try {
        // window.onload();
        const recipeRes = await axios({
          method: 'get',
          timeout: 1000,
          url: `/recipes/${id}`,
        });
        const body = recipeRes.data;
        let tempinit = {
          ...body,
          editRatio: 1,
          isFavourite: await checkSaved(),
          isPinned: await checkPinned(),
          haveReview: false,
          newRating: null,
        };
        setNewFoodData(tempinit);
        return body;
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleRecipe().then(recipeObj => console.log('done fetch for recipeId = ',recipeObj.recipeId));
  }, [id]);

  const handleDelete = async () => {
    let response;
    console.log('try to delete');
    try{
      response = await axios({
        method: 'post',
        timeout: 1000,
        url: `https://localhost:9000/remove/${id}`,
      });
      if (response.status === 200) {
        console.log(response.data);
        if (Object.keys(response.data).length>1) {
          console.log('ok removed and hidden!');
          window.alert('Success, recipe deleted!');
          window.location.replace('/home');
        } else if (Object.keys(response.data).length === 1){
          console.log('ok removed!');
          window.alert('Success, recipe removed from lists!');
          window.location.replace('/home');
        } else{
          window.alert('Failed to delete recipe');
        }
      }} catch (e) {
      console.log('err', e);
      window.alert('Failed to delete recipe')
    }
  }

  const updateFavourite = async () => {
    let newFav;
    if (newFoodData.isFavourite === true) {
      console.log('attemping to un-star');
      try {
        const response = await axios({
          method: 'post',
          timeout: 1000,
          url: `https://localhost:9000/star/remove/${id}`,
        });
        if (response.status === 200) {
          console.log('ok starred!');
        }
      } catch (err) {
        console.log('err', err);
      }
    } else {
      console.log('attempting to star');
      try {
        const response = await axios({
          method: 'post',
          timeout: 1000,
          url: `https://localhost:9000/star/add/${id}`,
        });
        if (response.status === 200) {
          console.log('ok un-starred!');
        }
      } catch (err) {
        console.log('err', err);
      }
    }
    newFav = !newFoodData.isFavourite;
    let tempfav = {
      ...newFoodData,
      isFavourite: newFav,
    };
    setNewFoodData(tempfav);
    return newFav;
  };

  const updatePinned = async () => {
    let newPin;
    if (newFoodData.isPinned === true) {
      console.log('attemping to un-pin');
      try {
        const response = await axios({
          method: 'post',
          timeout: 1000,
          url: `https://localhost:9000/pin/remove/${id}`,
        });
        if (response.status === 200) {
          console.log('ok un-pinned!');
        }
      } catch (err) {
        console.log('err', err);
      }
    } else {
      console.log('attempting to pin');
      try {
        const response = await axios({
          method: 'post',
          timeout: 1000,
          url: `https://localhost:9000/pin/add/${id}`,
        });
        if (response.status === 200) {
          console.log('ok pinned!');
        }
      } catch (err) {
        console.log('err', err);
      }
    }
    newPin = !newFoodData.isPinned;
    let temppin = {
      ...newFoodData,
      isPinned: newPin,
    };
    setNewFoodData(temppin);
    return newPin;
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
      id="pageContainer"
      style={{
        margin: '10px 100px 0px 300px',
      }}
    >
      {newFoodData &&
        <div>
          {console.log(newFoodData)}
          <Button
            type="link"
            href={'/browse'}
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
              <Link to= {`edit/${newFoodData.recipeId}`}>
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
              </Link>
              <Button
                danger
                style={{
                  fontSize: '17px', 
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                onClick = {() => {
                  const confirmBox = window.confirm("Are you sure you want to delete this recipe?")
                  if (confirmBox === true){
                    handleDelete()
                  }
                }}
              >
                Delete
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
                  disabled={newFoodData && !newFoodData.servingSize}
                  defaultValue={(newFoodData && newFoodData.servingSize)}
                  onChange={(value) => {
                    updateRatio(value);
                  }}
                  disabled={newFoodData && newFoodData.servingSize ? false : true}
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
                <InappTimer directions={newFoodData && newFoodData.directions}/>
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
      }
    </div>
  );
};

export default SingleRecipe;
