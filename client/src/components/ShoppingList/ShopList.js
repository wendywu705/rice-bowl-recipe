import { React, useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Layout/Footer.css';
import './ShopList.css';

const ShopList = () => {
  const [listData, setListData] = useState({});
  const [load, setLoad] = useState(false)
  let listObj = {};
  // let listData = {};

  let tempobj = {}
  useEffect(() => {
    const getShoppingList = async () => {
      try {
        const listRes = await axios({
          method: 'get',
          timeout: 1000,
          url: `https://backend-cepdewy2ta-nn.a.run.app/api/shopping`,
        });
        const body = listRes.data;
        setLoad(true);
        // console.log('body')
        // listData = {...body}
        setListData(body)
        return body;
      } catch (err) {
        console.log(err);
      }
    }
    getShoppingList();
    
  },[])

  // get curr week
  let today = new Date();
  let start = today.getDate() - today.getDay(); 
  let end = start + 6; 
  let wStart = new Date(today.setDate(start)).toLocaleDateString();
  let wEnd = new Date(today.setDate(end)).toLocaleDateString();


  let multiplier;

  for (const [recipe, ingredients] of Object.entries(listData)) {
    multiplier = ingredients['amt'];
    for (const [num, idata] of Object.entries(ingredients)) {
      for (const [index, foodinfo] of Object.entries(idata)) {
        // console.log('maybe it ', num)
        if (!foodinfo.quantity) {
          continue
        }
        if (foodinfo.description in listObj){
          listObj[foodinfo.description][0] += foodinfo.quantity*multiplier
        }
        else {
          listObj[foodinfo.description] = [foodinfo.quantity*multiplier, foodinfo.unitOfMeasure]
        }
      }
    }
  }
  return (
    <div id="pageContainer" className="listContainer">
      {load &&
        <div>
          <div>
            <div className="listTitle">Shopping List</div>
            <div className="currWeek">{wStart} - {wEnd}</div>
          </div>
          {(Object.keys(listData).length > 0) ?
            <div className="itemContainer">
              {Object.keys(listObj).map((data, ind, arr) => {
                return (
                  <div className="list">
                    {listObj[data][0]} {listObj[data][1]} {data} <br/>
                  </div>
                );
              })}
            </div>
            : 
            <div className="emptyContainer">
              <img 
                src={process.env.PUBLIC_URL + '/logo-blue.png'} 
                alt="rice bowl" 
                className="emptyLogo"
              />
              <div className="emptyText">
                You're Rice Bowl is empty.<br/>
                Add some food from 'Meal Planner'
              </div>
            </div>
          }
          <div className="buttonContainer">
            <Link to="/home">
              <Button
                className="buttonClass"
                type="primary"
              >
                Home
              </Button>        
            </Link>
            <Link to= "/mealplanner">
              <Button
                ghost
                type="primary"
                className="buttonClass"
              >
                Meal Planner
              </Button>
            </Link>
          </div>
        </div>
      }
    </div>
  );
};

export default ShopList;

