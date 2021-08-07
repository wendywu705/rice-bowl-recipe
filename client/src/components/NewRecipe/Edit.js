import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import axios from 'axios';
import './Form.css';
import '../Layout/Footer.css'

const { v4: uuidv4 } = require('uuid');

function Edit(props) {
  let formData = props.form
  let recipeData = props.recipe
  let state = props.data
  let selectedFile = props.selected
  let newFileName = '';

  const { id } = useParams();

  const test = async () => {
    const res = await axios.get('https://backend-cepdewy2ta-nn.a.run.app/home/');
    console.log('heyo', res);
  };

  const editRequest = async () => {
    try {
      const editResponse = await axios({
        method: 'get',
        timeout: 1000,
        url: `https://backend-cepdewy2ta-nn.a.run.app/recipes/edit/${id}`,
        withCredentials: true
      });
      if ([200, 304].includes(editResponse.status)) {
        console.log('mesg from edit', editResponse.data);
        // Object.values(editResponse.data).map((res) => {
        let res = editResponse.data;
        let ingre_string = '';
        if (res.ingredients !== null && res.ingredients !== undefined) {
          Object.values(res.ingredients).map((ing) => {
            let quantity = ing.quantity ? ing.quantity : 0;
            let description = ing.description ? ing.description : '';
            let unit = ing.unitOfMeasure ? ing.unitOfMeasure : '';
            ingre_string += quantity + ' ' + unit + ' ' + description + '\n';
          })
        }
        console.log('res', res)
        props.fill(
          res.name,
          res.imageUrl,
          res.category,
          ingre_string,
          res.time.prepMin,
          res.time.prepHour,
          res.time.cookHour,
          res.time.cookMin,
          res.servingSize,
          res.meta.rating,
          res.directions,
          res.url,
          res.hidden,
          res.recipeId
        )
      }
    } catch (err) {
      console.log('err', err);
    }
  }
  useEffect(() => {
    editRequest();
    test();
  }, []);

  // Handles the AJAX request for uploading the user image
  const uploadRequest = async () => {
    try {
      const response = await axios({
        method: 'post',
        timeout: 1000,
        url: `https://backend-cepdewy2ta-nn.a.run.app/api/imageupload`,
        data: formData,
        withCredentials: true
      });
      if (response.status === 200) {
        console.log('res', response);
        return response.data;
      } else {
        console.log('err with image upload');
      }
      return null;
    } catch (err) {
      console.log('err', err);
      return null;
    }
  };

  // Handles the AJAX request for uploading the recipe data
  const recipeEdit = async () => {
    try {
      const response = await axios({
        method: 'post',
        timeout: 2000,
        url: `https://backend-cepdewy2ta-nn.a.run.app/recipes/edit/${id}`,
        data: recipeData,
        withCredentials: true
      });
      if ([200, 304].includes(response.status)) {
        console.log('res', response);
        return response.data;
      }
      return null;
    } catch (err) {
      console.log('err', err);
      return null;
    }
  };

  // Handles 2 AJAX request, one for uploading the image to GCS, and other for uploading the recipe data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validation
    if (!props.valid()) {
      console.log('Form validation failed');
      console.log('errors:', state.errors);
      let errors = JSON.stringify(state.errors).replace(/\\n/g, "\\n");
      alert(`Form has errors. Cannot submit.\n ${errors}`)
      return;
    }
    let tempData;
    let userData;

    // Create a unique imageURL for each image
    // if no image inserted
    if (!selectedFile) {
      console.log('no new image upload, using original image')
      tempData = {
        ...state,
      };
    }
    //image is inserted
    else {
      console.log('image inserted');
      newFileName = uuidv4() + '-' + selectedFile.name;
      userData = {
        imageName: newFileName,
      };
      tempData = {
        ...state,
        imageUrl: `https://storage.googleapis.com/ricebowl-bucket-1/${newFileName}`,
      };
      // setState(tempData);
      formData.append('file', selectedFile);
      formData.append('data', JSON.stringify(userData));
      let uploadRes = uploadRequest();
      if (!uploadRes) {
        alert('image submission FAILED!');
      }
    }
    recipeData.append('data', JSON.stringify(tempData));
    let recipeResId = await recipeEdit();
    if (recipeResId) {
      alert('Recipe submitted successfully!');
      console.log('edited recipe_id', recipeResId);
      window.location.assign(`../recipe/${recipeResId}`);
    }
    else {
      alert('Recipe submission FAILED!\nMake sure recipe has ingredients and directions');
    }
  };
  return (
    <div className="Form" id="pageContainer">
      <div>
        <h1 className="edit-recipes-title">Edit Recipe:</h1>
        <form id="editForm" encType="multipart/form-data" method="PUT">
          <FormTemplate
            type="edit"
            data={state}
            update={props.update}
            check={props.check}
            submit={handleSubmit}
            handle={props.handle}
            num={props.num}
            pic={props.pic}
          />
        </form>
      </div>
    </div>
  );
}

export default Edit;
