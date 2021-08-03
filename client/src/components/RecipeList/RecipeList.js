import './RecipeList.css';
import {Col, Row} from 'antd';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlinePushpin, AiOutlineSave} from 'react-icons/ai';
import axios from "axios";

class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pinned: [],
            saved: [],
            dropdownOpenSaved: false,
            dropdownOpen_new: false,
        };
        this.toggleSaved = this.toggleSaved.bind(this);
        this.toggle_new = this.toggle_new.bind(this);
    }

    toggleSaved() {
        this.setState({ dropdownOpenSaved: !this.state.dropdownOpenSaved });
    }

    toggle_new() {
        this.setState({ dropdownOpen_new: !this.state.dropdownOpen_new });
    }

    async componentDidMount() {
        try {
            const res = await this.callApi();
            if (Object.keys(res).length>1){
                this.setState({ saved: res.savedRes });
                this.setState({ pinned: res.pinnedRes });
            }
        } catch(e){
            console.log('err',e);
        }
    }

    callApi = async () => {
        try{
            const pinnedResponse = await axios({
                method: 'get',
                timeout: 1000,
                url: `/pinned`,
            });

            const savedResponse = await axios({
                method: 'get',
                timeout: 1000,
                url: `/saved`,
            });
            if ( [200, 304].includes(savedResponse.status) && [200, 304].includes(pinnedResponse.status)){
                console.log('approved');
                return {savedRes: savedResponse.data, pinnedRes: pinnedResponse.data};
            }
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
                    <h2>Pinned Recipes</h2>
                    <div className="icons">
                        <AiOutlinePushpin size={28} />
                    </div>
                </div>
                <hr></hr>
                <div className="recipe-card">
                    <Row gutter={[10, 25]}>
                        {this.state.pinned.map((res) => (
                            <Col className="recipe-row" span={6}>
                                <div style={style}>
                                    <Link to= {`recipe/${res.recipeId}`}>
                                        <div>
                                            <h5 style={{color: '#fff'}}>{res.name}</h5>
                                            <img src={res.imageUrl} alt="Recipe thumbnail" height="130px" width="130px"/><br/>
                                            <span>Rate: {res.meta && res.meta.rating}/5</span><br/>
                                            <span>Votes: {res.meta && res.meta.votes} </span>
                                        </div>
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <br />
                <div className="flex">
                    <h2>Saved Recipes</h2>
                    <div className="icons">
                        <AiOutlineSave size={28} />
                    </div>
                    <ButtonDropdown isOpen={this.state.dropdownOpenSaved} toggle={this.toggleSaved}>
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
                <div className="recipe-card">
                    <Row gutter={[10, 25]}>
                        {this.state.saved.map((res) => (
                            <Col className="recipe-row" span={6}>
                                <div style={style}>
                                    <Link to= {`recipe/${res.recipeId}`}>
                                        <div>
                                            <h5 style={{color: '#fff'}}>{res.name}</h5>
                                            <img src={res.imageUrl} alt="Recipe thumbnail" height="130px" width="200px"/><br/>
                                            <span>Rate: {res.meta && res.meta.rating}/5</span><br/>
                                            <span>Votes: {res.meta && res.meta.votes} </span>
                                        </div>
                                    </Link>
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
