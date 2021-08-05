import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Form.css';
import '../Layout/Footer.css'
import FormTemplate from './FormTemplate';

import { Input, Upload, Button, InputNumber, Checkbox, Row, Col, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const { v4: uuidv4 } = require('uuid');

function Form() {
  const [state, setState] = useState({
    name: '',
    ingredients: '',
    prepHour: 0,
    prepMin: 0,
    cookHour: 0,
    cookMin: 0,
    servingSize: 1,
    directions: [],
    url: '',
    imageUrl: '',
    rating: 5,
    category: '',
    hidden: false,
    errors: {},
  });
  // Holds the uploaded image file in a state
  let [selectedFile, setSelectedFile] = useState(null);

  const test = async () => {
    const res = await axios.get('https://localhost:9000/home/');
    console.log('heyo', res);
  };
  useEffect(() => {
    test();
  }, []);

  // Form data to be embedded in post requests
  let formData = new FormData();
  let recipeData = new FormData();
  let newFileName = '';

  // Handles the AJAX request for uploading the user image
  const uploadRequest = async () => {
    try{
      const response = await axios({
        method: 'post',
        timeout: 1000,
        url: `https://localhost:9000/api/imageupload`,
        data: formData,
      });
      if (response.status === 200){
        console.log('res',response);
        return response.data;
      }
      return null;
    } catch (err){
      console.log('err',err);
      return null;
    }
  };

  // Handles the AJAX request for uploading the recipe data
  const recipeRequest = async () => {
    try{
      const response = await axios({
        method: 'post',
        timeout: 2000,
        url: `https://localhost:9000/recipes/new`,
        data: recipeData,
      });
      if (response.status === 200){
        console.log('res',response);
        return response.data;
      }
      return null;
    } catch (err){
      console.log('err',err);
      return null;
    }
  };

  // Track the uploaded image as a state
  const onChangeHandler = (e) => {
    console.log('selected file',e.file)
    setSelectedFile(e.file);
  };

  // General handle change function to update each corresponding value in recipe state
  function handleChange(event) {
    const value = event.target.value;
    console.log('handleChange',value)
    setState({
      ...state,
      [event.target.name]: value,
    });
  }

  function handleCheckBox(event) {
    console.log('checkbox', event)
    // handleChange(event);
    setState({...state, "hidden":event.target.checked})
    const hidden = document.getElementById('hidden');
    if (hidden) {
      hidden.value = hidden !== true;
    }
  }

  function handleValidation() {
    let formIsValid = true;
    state.errors = {};

    //Name
    if(state.name.length<1){
      formIsValid = false;
      state.errors["name"] = "Cannot be empty";
    }

    //category
    if (state.category.length<1){
      formIsValid = false;
      state.errors["category"] = "Cannot be empty";
    }

    //ingredients
    if (state.ingredients.length<1){
      formIsValid = false;
      state.errors["ingredients"] = "Cannot be empty";
    }

    //instructions
    if (state.directions.length<1){
      formIsValid = false;
      state.errors["directions"] = "Cannot be empty";
    }

    //ServingSize
    if (state.servingSize<1){
      formIsValid = false;
      state.errors["servingSize"] = "Cannot be less than 1";
    }

    //rating
    if (state.rating<0 || state.rating>5){
      formIsValid = false;
      state.errors["rating"] = "Must be between 0 and 5";
    }

    //time
    if (state.prepHour<0 || state.prepMin<0 || state.cookHour<0 || state.cookMin<0){
      formIsValid = false;
      state.errors["time"] = "Time cannot be negative.";
    }

    //url
    let valid = /^(https?:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/;
    if (state.url.length>0) {
      if (!valid.exec(state.url)) {
        state.errors["url"] = "Invalid youtube url";
      }
    }

    return formIsValid;
  }

  // Handles 2 AJAX request, one for uploading the image to GCS, and other for uploading the recipe data
  const handleSubmit = async(e) => {
    e.preventDefault();

    //form validation
    if(!handleValidation()){
      console.log('Form validation failed');
      console.log('errors:',state.errors);
      let errors = JSON.stringify(state.errors).replace(/\\n/g, "\\n");
      alert(`Form has errors. Cannot submit.\n ${errors}`)
      return;
    }
    let tempData;
    let userData;

    // Create a unique imageURL for each image
    //if no image inserted
    if (!selectedFile){
      console.log('no image, using stock apron image')
      let defaultFileName = `c9f85699-7aae-45bf-b47e-5c1913f06d6a-no_image.jpeg`
      tempData = {
        ...state,
        imageUrl: `https://storage.googleapis.com/ricebowl-bucket-1/${defaultFileName}`,
      };
    }
    //image is inserted
    else{
      console.log('image inserted');
      newFileName = uuidv4() + '-' + selectedFile.name;
      userData = {
        imageName: newFileName,
      };
      tempData = {
        ...state,
        imageUrl: `https://storage.googleapis.com/ricebowl-bucket-1/${newFileName}`,
      };
      formData.append('file', selectedFile);
      console.log('selectedFile', selectedFile)
      formData.append('data', JSON.stringify(userData));
      console.log('data',JSON.stringify(userData))
      console.log('form data', formData)
      let uploadRes = uploadRequest();
      if (!uploadRes){
        alert('image submission FAILED!');
      }
    }
    recipeData.append('data', JSON.stringify(tempData));
    let recipeResId = await recipeRequest();
    if (recipeResId){
      alert('Recipe submitted successfully!');
      console.log('new recipe_id',recipeResId);
      window.location.assign(`../recipe/${recipeResId}`);
    }
    else{
      alert('Recipe submission FAILED!\nMake sure recipe has ingredients and directions');
    }
  };
  const updateNum = (value, name) => {
    console.log('in num', name, value)
    // setState({...state, name : value})
    let temp={
      ...state,
      name: value
    }
    setState(temp)
  }

  return (
      <div className="Form" id="pageContainer">
        {console.log('SELECTEDFILE', selectedFile)}
        <div>
          <h1 className="new-recipes-title">New Recipe:</h1>
          <form id="recipeForm" encType="multipart/form-data" method="POST">
            <FormTemplate 
              type={"new"}
              data={state}
              update={handleChange}
              check={handleCheckBox}
              submit={handleSubmit}
              handle={onChangeHandler}
              num={updateNum}
            />
          </form>
        </div>
      </div>
  );
}

export default Form;
