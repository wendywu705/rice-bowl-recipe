import React, { Component } from 'react';
import { Button } from 'reactstrap';
import RecipeTiles from '../Layout/RecipeTiles';
import axios from "axios";
import { withRouter } from "react-router";
import '../RecipeList/RecipeList.css';

class SearchResult extends Component{
    constructor(props){
        super(props);
        this.state = {
            search: [],
            searchName: ''
        };
    }

    async componentDidMount(){
        const name = this.props.match.params.name;
        document.getElementById('search-name').innerText="Search for: "+ name;
        try{
            const res = await this.callApi(name);
            this.setState({ search: res.searchRes});
        } catch (e) {
            throw e;
        }
    }

    callApi = async (name) => {
        console.log(name);
        try{
            const searchResponse = await axios({
                method: 'get',
                timeout: 1000,
                url: `/search/${name}`,
                withCredentials: true

            });
            if( [200, 304].includes(searchResponse.status)){
                console.log('Found recipes by name', searchResponse.data);
                return {searchRes: searchResponse.data}
            }
        } catch (err){
            console.log('Could not search recipe', err);
        }
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
        if(searchName){
            window.location.assign(`/search/${searchName}`)
        } else{
            alert('Enter some recipe name to start your search');
        }
    }

    render(){
        return(
            <div className="all-recipe" id="pageContainer">
                <h1 id="search-name"></h1>
                <br/>
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
                </div>
                <br/>
                <div className="recipe-card">
                    <RecipeTiles data={this.state.search} />
                </div>
            </div>
        )
    }
}

export default withRouter(SearchResult);