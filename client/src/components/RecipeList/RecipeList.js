import './RecipeList.css';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlinePushpin, AiOutlineSave } from 'react-icons/ai';
import RecipeTiles from '../Layout/RecipeTiles';
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
        this.sortByRate = this.sortByRate.bind(this);
        this.sortByPrepTime = this.sortByPrepTime.bind(this);
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

    sortByRate(){
        const sortRate = [].concat(this.state.saved)
            .sort((a,b) => b.meta.rating - a.meta.rating);
        this.setState( {saved: sortRate} );
        console.log('sort by rate', sortRate);
    }

    sortByPrepTime(){
        const sortPrep = [].concat(this.state.saved)
            .sort((a,b) => b.time.prepHour*60+b.time.prepMin - a.time.prepHour*60+a.time.prepMin);
        this.setState( {saved: sortPrep} );
        console.log('sort by prep time', sortPrep);
    }

    render() {
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
                  <RecipeTiles data={this.state.pinned} />
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
                            <DropdownItem onClick={this.sortByRate}>Rate</DropdownItem>
                            <DropdownItem onClick={this.sortByPrepTime}>Prep Time</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
                <hr></hr>
                <div className="recipe-card">
                  <RecipeTiles data={this.state.saved} />
                </div>
            </div>
        );
    }
}

export default RecipeList;
