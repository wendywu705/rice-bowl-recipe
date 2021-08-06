import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import RecipeTiles from '../Layout/RecipeTiles';
import './Browse.css';
import '../Layout/Footer.css'
import {
  ButtonDropdown, 
  DropdownItem, 
  DropdownMenu, 
  DropdownToggle
} from 'reactstrap';


class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            public: [],
            dropdownOpenPublic: false,
            searchName: ''
        };
        this.togglePublic = this.togglePublic.bind(this);
        this.sortByRate = this.sortByRate.bind(this);
        this.sortByPrepTime = this.sortByPrepTime.bind(this);
    }

    togglePublic() {
        this.setState({ dropdownOpenPublic: !this.state.dropdownOpenPublic });
    }

    async componentDidMount() {
        try {
            const res = await this.callApi();
            if (Object.keys(res).length===1){
                this.setState({ public: res.publicRes });
            }
        } catch(e){
            console.log('err',e);
        }
    }

    callApi = async () => {
        let publicResponse=[];
        try{
            publicResponse = await axios({
                method: 'get',
                timeout: 1000,
                url: `/home`,
            });
            if ( [200, 304].includes(publicResponse.status)){
                console.log('approved');
                return {publicRes: publicResponse.data};
            }
        } catch (err){
            console.log('err',err);
        }
    };

    sortByRate(){
        const sortRate = [].concat(this.state.public)
            .sort((a,b) => b.meta.rating - a.meta.rating);
        this.setState( {public: sortRate} );
        console.log('sort by rating', sortRate);
    }

    sortByPrepTime(){
        const sortPrep = [].concat(this.state.public)
            .sort((a,b) => b.time.prepHour*60+b.time.prepMin - a.time.prepHour*60+a.time.prepMin);
        this.setState( {public: sortPrep} );
        console.log('sort by prep time',sortPrep);
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

    render() {
        return (
            <div className="all-recipe" id="pageContainer">
                <h1><b>BROWSE RECIPES</b></h1><br/>
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
                <br />
                <div className="flex">
                    <h2>Public Recipes</h2>
                    <ButtonDropdown isOpen={this.state.dropdownOpenPublic} toggle={this.togglePublic}>
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
                  <RecipeTiles data={this.state.public} />
                </div>
            </div>
        );
    }
}

export default Browse;
