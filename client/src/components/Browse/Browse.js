import './Browse.css';
import {Col, Rate, Row} from 'antd';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            public: [],
            dropdownOpenPublic: false,
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
                <h1><b>BROWSE RECIPES</b></h1><br/>
                <div className="search-bar">
                    {/* TODO: search function to be design */}
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Quick Find Recipe"
                        name="quick-find"
                    />
                </div>
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
                    <Row gutter={[10, 25]}>
                        {this.state.public.map((res) => (
                            <Col className="recipe-row" span={6} key={res.recipeId}>
                                <div style={style}>
                                    <Link to= {`recipe/${res.recipeId}`}>
                                        <div>
                                            <h5 style={{color: '#fff'}}>{res.name}</h5>
                                            <img src={res.imageUrl} alt="Recipe thumbnail" height="150px" width="200px"/><br/>
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

export default Browse;
