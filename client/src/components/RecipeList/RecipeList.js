import React, {useState} from 'react';
import './RecipeList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonGroup, CardImg } from 'reactstrap';
import { Card, Button, CardTitle, CardText, CardGroup } from 'reactstrap';
import { Link } from "react-router-dom";

function ReciepeList() {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    return(
        <div className='all-recipe'>
            <h1>All Recipes</h1><hr></hr>
            <div className='search-bar'>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Quick Find Recipe"
                    name="quick-find"
                />
                <ButtonGroup>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle className="Button" caret outline color="primary">
                            Sort by
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Rate</DropdownItem>
                            <DropdownItem>Prep Time</DropdownItem>                    
                            <DropdownItem>Total Time</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <Link to="/new_recipe">
                        <Button className="Button" color="primary">+ New Recipe</Button>
                    </Link>
                </ButtonGroup>
            </div>
            <h1>Pinned</h1><hr></hr>
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
            <br/>
            <h1>Browse</h1><hr></hr>
            <div className='browse-recipe'>
                
            </div>
        </div>
    )
}

export default ReciepeList