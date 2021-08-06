import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import axios from 'axios';
import '../RecipeList/RecipeList.css';
import '../Layout/Footer.css';

class ParseForm extends Component{
  constructor(){
    super();
    this.state = {
      url: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  
  handleSubmit = e => {
    e.preventDefault();

    const { url } = this.state;
    console.log(url);
    const parseInfo = { url };

    if(url){
      axios.post('https://backend-cepdewy2ta-nn.a.run.app/parse', parseInfo,{withCredentials: true})
        .then(response => {
          console.log('res',response);
          if(response.status === 200){
            const recipeId = response.data;
            window.location.assign(`/recipe/${recipeId}`)
            console.log('res', response);
          }
          else{
            alert('Error: Failed to parse domain, please entry a correct domain URL');
          }
        })
        .catch(err => {
          alert('Error: Failed to parse domain, please entry a correct domain URL');
          console.error(err);
        });
    } else{
      alert('Please enter a valid URL domain.');
    }

  };

  render() {
    return (
      <div className="all-recipe" id="pageContainer">
        <h1>Parse Recipe From URL</h1><br/>
        <Form className="search-bar" method="POST" onSubmit={this.handleSubmit}>
          <span className="span">URL: </span>
          <Input
              type="text"
              id="parse-url"
              placeholder="URL address"
              name="url"
              value={this.state.url}
              onChange={this.handleInputChange}
          />
          <Button id="btn" color="primary" type="submit">Parse</Button>
        </Form><hr/>
        <div className="supported-web">
          <h5>We supported most recipe websites on the below list:</h5>
          <ul>
            <li>https://www.101cookbooks.com/</li>
            <li>https://www.allrecipes.com/</li>
            <li>https://www.ambitiouskitchen.com/</li>
            <li>https://www.bbc.co.uk/</li>
            <li>https://www.bbcgoodfood.com/</li>
            <li>https://www.bonappetit.com/</li>
            <li>https://www.budgetbytes.com/</li>
            <li>https://www.closetcooking.com/</li>
            <li>https://cookieandkate.com/</li>
            <li>https://copykat.com/</li>
            <li>http://www.eatingwell.com/</li>
            <li>https://www.epicurious.com/</li>
            <li>https://www.finecooking.com/</li>
            <li>https://www.food.com/</li>
            <li>https://www.foodandwine.com/</li>
            <li>https://www.foodnetwork.com/</li>
            <li>http://www.gimmesomeoven.com/</li>
            <li>https://www.myrecipes.com/</li>
            <li>https://www.seriouseats.com/</li>
            <li>https://www.simplyrecipes.com/</li>
            <li>https://smittenkitchen.com/</li>
            <li>https://thepioneerwoman.com/</li>
            <li>https://therealfoodrds.com/</li>
            <li>https://www.thespruceeats.com/</li>
            <li>https://whatsgabycooking.com/</li>
            <li>https://www.woolworths.com.au/</li>
            <li>https://www.yummly.com/</li>
          </ul>
        </div>
      </div>
  );
  }
}

export default ParseForm;