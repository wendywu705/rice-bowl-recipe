import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import '../Layout/Footer.css'
// import FormTemplate from './FormTemplate';

const { v4: uuidv4 } = require('uuid');

const FormTemplate = (props) => {
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
  const { id } = useParams();

  const test = async () => {
    const res = await axios.get('https://localhost:9000/home/');
    console.log('heyo', res);
    if (state.hidden){
      document.getElementById('checkbox').checked = true;
    } else {
      document.getElementById('checkbox').checked = false;
    }
  };

  const editRequest = async () => {
    try{
      const editResponse = await axios({
        method: 'get',
        timeout: 1000,
        url: `https://localhost:9000/recipes/edit/${id}`
      });
      if( [200, 304].includes(editResponse.status)){
        console.log('mesg from edit', editResponse.data);
        Object.values(editResponse).map((res) => {
          let ingre_string = '';
          if (res.ingredients != null && res.ingredients != undefined){
            Object.values(res.ingredients).map((ing) => {
              let quantity = ing.quantity ? ing.quantity : 0;
              let description = ing.description ? ing.description : '';
              let unit = ing.unitOfMeasure ? ing.unitOfMeasure : '';
              ingre_string += quantity + ' ' + unit + ' ' + description + '\n';
            })
          }
          console.log(res.directions.toString());
          setState({
            ...state,
            name: res.name,
            imageUrl: res.imageUrl,
            category: res.category,
            ingredients: ingre_string,
            prepMin: res.time.prepMin,
            prepHour: res.time.prepHour,
            cookHour: res.time.cookHour,
            cookMin: res.time.cookMin,
            servingSize: res.servingSize,
            rating: res.meta.rating, //TODO: change so that the author cannot change rating
            directions: res.directions.toString().split('.').join('.\n'),
            url: res.url ? res.url : '',
            hidden: res.hidden
          });
        });
      }
    } catch (err){
      console.log('err',err);
    }
  }

  useEffect(() => {
    editRequest();
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
  const recipeEdit = async () => {
    try{
      const response = await axios({
        method: 'post',
        timeout: 2000,
        url: `https://localhost:9000/recipes/edit/${id}`,
        data: recipeData,
      });
      if ( [200, 304].includes(response.status) ){
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
    setSelectedFile(e.target.files[0]);
  };

  // General handle change function to update each corresponding value in recipe state
  function handleChange(event) {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  }

  function handleCheckBox(event) {
    handleChange(event);
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
      console.log('did not change the image, use the old one')
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
    let recipeResId = await recipeEdit();
    if (recipeResId){
      alert('Recipe submitted successfully!');
      console.log('edited recipe_id',recipeResId);
      window.location.assign(`../${recipeResId}`);
    }
    else{
      alert('Recipe submission FAILED!\nMake sure recipe has ingredients and directions');
    }
  };



  // let state = props.data
  return(
    // <form id="recipeForm" encType="multipart/form-data" method="POST">
    <div>
        <label className="recipe-name-title">
          Recipe Name: <br />
          <input
              className="inputBox"
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder="Enter Recipe Title"
              required="required"
          />
        </label>{' '}
        <br />
        Image: <br />
        <div className="wrap-imge"><img id="exist-image" alt="recipe image" src={state.imageUrl}/></div>
        <input type="file" name="file" className="inputBox" onChange={onChangeHandler} />
        <br />
        <label className="Category">
          Categories: <br />
          <input
              className="inputBox"
              type="text"
              name="category"
              value={state.category}
              onChange={handleChange}
              placeholder="Enter Categories seperated by commas. eg) Chinese, Cake, Fish"
          />
        </label>{' '}
        <br />
        <label className="Ingredients">
          Recipe Ingredients: <br />
          <textarea
              className="inputBox"
              name="ingredients"
              value={state.ingredients}
              onChange={handleChange}
              placeholder="quantity/unit/ingredient&#13;3 cups carrots &#13;2 eggs &#13;5 cloves garlic &#13;etc..."
              required
          />
        </label>{' '}
        <br />
        <label className="Prep">
          Prep Hours:
          <input
              className="inputBox"
              type="number"
              name="prepHour"
              value={state.prepHour}
              onChange={handleChange}
              min="0"
          />
        </label>
        <label className="Prep">
          Prep Mins:
          <input
              className="inputBox"
              type="number"
              name="prepMin"
              value={state.prepMin}
              onChange={handleChange}
              min="0"
              max="59"
          />
        </label>{' '}
        <br />
        <label className="Cook">
          Cook Hours:
          <input
              className="inputBox"
              type="number"
              name="cookHour"
              value={state.cookHour}
              onChange={handleChange}
              min="0"
          />
        </label>
        <label className="Cook">
          Cook Mins:
          <input
              className="inputBox"
              type="number"
              name="cookMin"
              value={state.cookMin}
              onChange={handleChange}
              min="0"
              max="59"
          />
        </label>{' '}
        <br />
        <label className="Serving-Size">
          Serving Size:
          <input
              className="inputBox"
              type="number"
              name="servingSize"
              value={state.servingSize}
              onChange={handleChange}
              min="1"
          />
        </label>
        <label className="Rating">
          Rating:
          <input
              className="inputBox"
              type="number"
              name="rating"
              value={state.rating}
              readOnly
          />
        </label>{' '}
        <br />
        <label>
          Recipe Steps: <br />
          <textarea
              className="inputBox"
              name="directions"
              value={state.directions}
              onChange={handleChange}
              placeholder="Chop up all carrots and garlic. &#13;&#13;Pour water over the carrots and add along the chopped garlic."
              required
          />
        </label>{' '}
        <br />
        <label className="url">
          Video Clip: <br />
          <input
              className="inputBox"
              type="text"
              name="url"
              value={state.url}
              onChange={handleChange}
              placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        </label>{' '}
        <br />
        <label className="hidden">
          <p>Only Private View?</p>
          <input
              id="checkbox"
              className="inputBox"
              type="checkbox"
              name="hidden"
              value={state.hidden}
              onChange={handleCheckBox}
          />
        </label>{' '}
        <br />
        <div className="align-center">
          <button className="Submit" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>

    </div>
    // </form>

  );
}

export default FormTemplate;