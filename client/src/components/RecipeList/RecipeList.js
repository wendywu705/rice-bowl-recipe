import React, {useState} from 'react';
import './RecipeList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup } from 'reactstrap';
import { Card, Button, CardTitle, CardText, CardGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import { AiOutlinePushpin, AiOutlineSave } from 'react-icons/ai';

function RecipeList() {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    return(
        <div className='all-recipe'>
            <div className='search-bar'>
                <h1>Your Recipes</h1>
                <input
                    className="search"
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
                </CardGroup>
            </div>
            <br/><br/>
            <div className='flex'>
                <h1>Saved Recipes</h1>
                <div className="icons"><AiOutlineSave size={28} /></div>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret outline color="primary">
                        Sort by
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Rate</DropdownItem>
                        <DropdownItem>Prep Time</DropdownItem>                    
                        <DropdownItem>Total Time</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
            <hr></hr>
            <div className='saved-recipe'>
                
            </div>
        </div>
    )
}

export default RecipeList