import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import axios from "axios";
import './RecipeList.css';

class ParseForm extends Component{
  constructor(){
      super();
  }

  callApi = async () => {
    try{
      const response = await axios({
        method: 'get',
        timeout: 1000,
        url: `/parse`,
      });
      if (response.status === 200){
        console.log('res',response);
        return response.data;
      }
      return Error('error fetching from /parse');
    } catch (err){
      console.log('err',err);
    }
  };

  render() {
    return (
      <div className="all-recipe">
        <h1>Parse From URL</h1><hr/>
        <Form className="search-bar" method="POST"> 
          <span className="span">URL: </span>
          <Input
              type="text"
              id="parse-url"
              placeholder="URL address"
              name="url"
          />
          <Button id="btn1" color="primary">Parse</Button>
        </Form>
      </div>
  );
  }
}

export default ParseForm;