import './RecipeList.css';
import { Row, Col } from 'antd';
import { Button } from 'reactstrap';
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

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/home');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const style = {
      color: '#ffffff',
      background: '#6495ED',
      padding: '75px 0 75px 10px',
      opacity: 0.8,
    };

    return (
      <div className="all-recipe">
        <div className="search-bar">
          <h1>Your Recipes</h1>
          {/* TODO: serch function to be design */}
          <input
            type="text"
            id="header-search"
            placeholder="Quick Find Recipe"
            name="quick-find"
          />
          <Link to="/new_recipe">
            <Button color="primary">+ New Recipe</Button>
          </Link>
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
          {/* TODO: Add links to each displayed recipe */}
          <Row gutter={[30, 20]}>
            {this.state.response.map((res) => (
              <Col className="recipe-row" span={6}>
                <div style={style}>
                  <h5>{res.name}</h5>
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
