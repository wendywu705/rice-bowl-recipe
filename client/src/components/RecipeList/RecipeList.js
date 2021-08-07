import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlinePushpin, AiOutlineSave } from 'react-icons/ai';
import RecipeTiles from '../Layout/RecipeTiles';
import axios from "axios";
import './RecipeList.css';
import '../Layout/Footer.css';

class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pinned: [],
            saved: [],
            dropdownOpenSaved: false,
            dropdownOpen_new: false,
            searchName: ''
        };
        this.toggleSaved = this.toggleSaved.bind(this);
        this.toggle_new = this.toggle_new.bind(this);
        this.sortByRate = this.sortByRate.bind(this);
        this.sortByPrepTime = this.sortByPrepTime.bind(this);
        this.sortByTotalTime = this.sortByTotalTime.bind(this);
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
            if (Object.keys(res).length > 1) {
                this.setState({ saved: res.savedRes });
                this.setState({ pinned: res.pinnedRes });
            }
        } catch (e) {
            console.log('err', e);
        }
    }

    callApi = async () => {
        try {
            const pinnedResponse = await axios({
                method: 'get',
                timeout: 1000,
                url: `https://backend-cepdewy2ta-nn.a.run.app/pinned`,
                withCredentials: true
            });

            const savedResponse = await axios({
                method: 'get',
                timeout: 1000,
                url: `https://backend-cepdewy2ta-nn.a.run.app/saved`,
                withCredentials: true
            });
            if ([200, 304].includes(savedResponse.status) && [200, 304].includes(pinnedResponse.status)) {
                console.log('approved');
                return { savedRes: savedResponse.data, pinnedRes: pinnedResponse.data };
            }
        } catch (err) {
            console.log('err', err);
        }
    };

    sortByRate() {
        const sortRate = [].concat(this.state.saved)
            .sort((a, b) => b.meta.rating - a.meta.rating);
        this.setState({ saved: sortRate });
        console.log('sort by rate', sortRate);
    }

    sortByPrepTime() {
        const sortPrep = [].concat(this.state.saved)
            .sort((a, b) => b.time.prepHour * 60 + b.time.prepMin - a.time.prepHour * 60 + a.time.prepMin);
        this.setState({ saved: sortPrep });
        console.log('sort by prep time', sortPrep);
    }

    sortByTotalTime() {
        const sortTotal = [].concat(this.state.saved)
            .sort((a, b) => b.time.prepHour * 60 + b.time.prepMin + b.time.cookHour * 60 + b.time.cookMin - a.time.prepHour * 60 + a.time.prepMin + a.time.cookHour * 60 + a.time.cookMin);
        this.setState({ saved: sortTotal });
        console.log('sort by total time', sortTotal);
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    searchSubmit = e => {
        e.preventDefault();
        const { searchName } = this.state;
        console.log(searchName);
        if (searchName) {
            window.location.assign(`/search/${searchName}`)
        } else {
            alert('Enter some recipe name to start your search');
        }
    }

    render() {
        return (
            <div className="all-recipe" id="pageContainer">
                <h1><b>YOUR RECIPES</b></h1><br />
                <div className="search-bar">
                    <form method="POST" onSubmit={this.searchSubmit}>
                        <input
                            type="text"
                            id="header-search"
                            placeholder="  Quick find recipe by name"
                            name="searchName"
                            value={this.state.searchName}
                            onChange={this.handleInputChange}
                        />
                    </form>
                    <ButtonDropdown id="drp-btn" isOpen={this.state.dropdownOpen_new} toggle={this.toggle_new}>
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
                            <DropdownItem onClick={this.sortByTotalTime}>Total Time</DropdownItem>
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
