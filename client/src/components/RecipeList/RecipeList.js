import React, { Component } from 'react';
import './RecipeList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Card, Button, CardTitle, CardText, CardGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import { AiOutlinePushpin, AiOutlineSave } from 'react-icons/ai';


class ReciepeList extends Component {
    constructor(){
        super();
        this.state = {
            response: String,
            dropdownOpen: false,
        };
        this.toggle=this.toggle.bind(this);
    }
    toggle(){
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    componentDidMount(){
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/home');
        const body = await response.json();

        if(response.status !== 200) throw Error(body.message);
        return body;
    };
    

    render() {
        return(
            <div className='all-recipe'>
                 <p>{this.state.response}</p>
                <div className='search-bar'>
                    <h1>Your Recipes</h1>
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
                <br/>
                <div className='flex'><h1>Pinned</h1><div className="icons"><AiOutlinePushpin size={28} /></div></div>
                <hr></hr>
                <div className='pinned-recipe'>
                    <CardGroup>
                        <Card body>
                            <CardTitle tag="recipe">Recipe Title</CardTitle>
                            <CardText>Rate, Reviews, ...</CardText>
                        </Card>
                        <Card body>
                            <CardTitle tag="recipe">Recipe Title</CardTitle>
                            <CardText>Rate, Reviews, ...</CardText>
                        </Card>
                        <Card body>
                            <CardTitle tag="recipe">Recipe Title</CardTitle>
                            <CardText>Rate, Reviews, ...</CardText>
                        </Card>
                        <Card body>
                            <CardTitle tag="recipe">Recipe Title</CardTitle>
                            <CardText>Rate, Reviews, ...</CardText>
                        </Card>
                    </CardGroup>
                </div>
                <br/><br/>
                <div className='flex'>
                    <h1>Saved Recipes</h1>
                    <div className="icons"><AiOutlineSave size={28} /></div>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.state.toggle}>
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
                <div className='saved-recipe'>
                    <span>{this.state.response}</span>
                </div>
            </div>
        )
    }
}

export default ReciepeList