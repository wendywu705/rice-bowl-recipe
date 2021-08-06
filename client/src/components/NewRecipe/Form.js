import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit from "./Edit";
import New from "./New";
import './Form.css';
import '../Layout/Footer.css';

const Form = (props) => {
  const [file, setFile] = useState([]);
  const [remove, setRemove] =  useState(false);
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
    const res = await axios.get('https://backend-cepdewy2ta-nn.a.run.app/home');
    console.log('heyo', res);
  };
  useEffect(() => {
    test();
  }, []);
  
  // Form data to be embedded in post requests
  let formData = new FormData();
  let recipeData = new FormData();

  const parseDirections = (dir) => {
    let resDir = ""
    for (let i=0; i<dir.length; i++) {
      resDir += dir[i]
      if (i < dir.length-1) {
        resDir += "\n"
      }
    }
    return resDir;
  }

  const updateState = (
    name, 
    imageUrl,
    category,
    ingre_string,
    prepMin,
    prepHour,
    cookHour,
    cookMin,
    servingSize,
    rating,
    directions,
    url,
    hidden,
    recipeId
  ) => {
    return(
      setState({
        ...state,
        name: name,
        imageUrl: imageUrl,
        category: category,
        ingredients: ingre_string,
        prepMin: prepMin,
        prepHour: prepHour,
        cookHour: cookHour,
        cookMin: cookMin,
        servingSize: servingSize,
        rating: rating, //TODO: change so that the author cannot change rating
        directions: parseDirections(directions),
        url: url ? url : '',
        hidden: hidden,
        recipeId: recipeId
      })
    );
  }

  // Track the uploaded image as a state
  const onChangeHandler = (e) => {
    if (e.file.status === 'removed'){
      setSelectedFile(null)
      setRemove(true)
    }
    else {
      setSelectedFile(e.file);
    }
    setFile(e.fileList);
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

    // url
    if (state.url!==""){
      try {
        new URL(state.url);
      } catch (e) {
        console.error(e);
        state.errors["url"] = "Invalid url";
        formIsValid  = false;
      }
    }
    return formIsValid;
  }

  const updateNum = (key, value) => {
    setState(state=> ({
      ...state,
      [key]: value
    }))    
  }

  const getImgName = (img) => {
    let ind = img.lastIndexOf('-');
    let retImg = img.substring(ind+1, img.length)
    return retImg;
  }

  if (file.length===0 && state.imageUrl && !remove) {
    setFile([
      {
        uid: '-1',
        name: getImgName(state.imageUrl),
        status: 'done',
        url: state.imageUrl,
        thumbUrl: state.imageUrl
      }
    ])
  }

  let fullData = {
    valid: handleValidation,
    update: handleChange,
    check: handleCheckBox,
    handle: onChangeHandler,
    num: updateNum,
    data: state,
    form: formData,
    recipe: recipeData,
    selected: selectedFile,
    pic: file,
    fill: updateState
  }

  let partialData = Object.assign(
    {}, 
    fullData, 
    {pic: undefined, fill:undefined}
  );
  return(
    <div>
      { (props.type==="edit") ?
        <Edit {...fullData}/>    
        : 
        <New {...partialData}/>  
      }
    </div>
  );
};

export default Form;