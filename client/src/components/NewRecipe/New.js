import React from 'react';
import axios from 'axios';
import FormTemplate from './FormTemplate';
import './Form.css';
import '../Layout/Footer.css'

const { v4: uuidv4 } = require('uuid');

function New(props) {
  let recipeData = props.recipe;
  let state = props.data;
  let selectedFile = props.selected;
  let formData = props.form;
  let newFileName = '';

  // Handles the AJAX request for uploading the user image
  const uploadRequest = async () => {
    try{
      const response = await axios({
        method: 'post',
        timeout: 1000,
        url: `https://backend-cepdewy2ta-nn.a.run.app/api/imageupload`,
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
        url: `https://backend-cepdewy2ta-nn.a.run.app/recipes/new`,
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


  // Handles 2 AJAX request, one for uploading the image to GCS, and other for uploading the recipe data
  const handleSubmit = async(e) => {
    e.preventDefault();

    //form validation
    if(!props.valid()){
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
      formData.append('data', JSON.stringify(userData));
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

  return (
      <div className="Form" id="pageContainer">
        <div>
          <h1 className="new-recipes-title">New Recipe:</h1>
          <form id="recipeForm" encType="multipart/form-data" method="POST">
            <FormTemplate 
              type="new"
              data={state}
              update={props.update}
              check={props.check}
              submit={handleSubmit}
              handle={props.handle}
              num={props.num}
            />
          </form>
        </div>
      </div>
  );
}

export default New;
