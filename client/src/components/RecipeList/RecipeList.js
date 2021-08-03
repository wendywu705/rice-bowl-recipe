import './RecipeList.css';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlinePushpin, AiOutlineSave } from 'react-icons/ai';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import axios from "axios";

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      dropdownOpen: false,
      dropdownOpen_new: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggle_new = this.toggle_new.bind(this);
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggle_new() {
    this.setState({ dropdownOpen_new: !this.state.dropdownOpen_new });
  }

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    try{
      const response = await axios({
        method: 'get',
        timeout: 1000,
        url: `/home`,
      });
      if (response.status === 200){
        console.log('res',response);
        return response.data;
      }
      return Error('error fetching from /home');
    } catch (err){
      console.log('err',err);
    }
  };

  render() {
    const style = {
      background: '#6495ED',
      padding: '25px 0 15px 10px',
      opacity: 0.8,
      height: '300px',
      width: '300px'
    };

    return (
      <div className="all-recipe">
        <h1><b>YOUR RECIPES</b></h1><br/>
        <div className="search-bar">
          {/* TODO: search function to be design */}
          <input
            type="text"
            id="header-search"
            placeholder="Quick Find Recipe"
            name="quick-find"
          />
          <ButtonDropdown isOpen={this.state.dropdownOpen_new} toggle={this.toggle_new}>
            <DropdownToggle caret color="primary">
              + New Recipe
            </DropdownToggle>
            <DropdownMenu>
              <Link to="/new_recipe"><DropdownItem>From Template</DropdownItem></Link>
              <Link to="/parse"><DropdownItem>From URL</DropdownItem></Link>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <br />
        <div className="flex">
          <h2>Pinned</h2>
          <div className="icons">
            <AiOutlinePushpin size={28} />
          </div>
        </div>
        <hr></hr>
        <div className="pinned-recipe"></div>
        <br />
        <br />
        <div className="flex">
          <h2>Saved Recipes</h2>
          <div className="icons">
            <AiOutlineSave size={28} />
          </div>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline color="primary">
              Sort by
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Rate</DropdownItem>
              <DropdownItem>Prep Time</DropdownItem>
              <DropdownItem>Total Time</DropdownItem>
              <DropdownItem>Serving Size</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <hr></hr>
        <div className="saved-recipe">
          <Row gutter={[10, 25]}>
            {this.state.response.map((res) => (
              <Col className="recipe-row" span={6}>    
                <div style={style}>
                  <Link to= {`recipe/${res.recipeId}`}>
                    <h5 style={{color: '#fff'}}>{res.name}</h5>
                  </Link>
                  <img src={res.imageUrl} alt="Recipe thumbnail"
                  height="130px" width="200px"></img><br/>
                  <span>Rate: {res.meta && res.meta.rating}/5</span><br/>
                  <span>Votes: {res.meta && res.meta.votes} </span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}

export default RecipeList;
