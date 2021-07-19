import React, { useState } from 'react';
import axios from 'axios';
import './Login/Login.css';

const UploadTest = () => {
  const [imageName, setImageName] = useState('');
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    prepHour: 0,
    prepMin: 0,
    cookHour: 0,
    cookMin: 0,
    servingSize: 0,
    directions: [],
    url: '',
    rating: 5,
    category: '',
    hidden: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  let formData = new FormData();

  const uploadRequest = async () => {
    const uploadRes = await axios({
      method: 'post',
      url: `https://localhost:9000/api/imageupload`,
      data: formData,
    });
  };

  function handleChange(event) {
    const value = event.target.value;
    setRecipe({
      ...recipe,
      [event.target.name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedFile);

    formData.append('file', selectedFile);

    let userData = {
      imageName: imageName,
      name: recipe.name,
    };

    formData.append('data', JSON.stringify(userData));
    uploadRequest();
  };

  const nameChangeHandler = (e) => {
    console.log(e.target.value);
    setImageName(e.target.value);
  };

  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="center">
      <h1>Upload Test</h1>
      <form>
        <input type="text" />
      </form>

      <form id="create-form" enctype="multipart/form-data" method="POST">
        <label className="recipe-name-title">
          Recipe Name: <br />
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Enter Recipe Title"
            required="required"
          />
        </label>{' '}
        <input
          type="text"
          name="imagename"
          placeholder="Name of photo"
          onChange={nameChangeHandler}
        />
        <input type="file" name="file" onChange={onChangeHandler} />
        <div class="ui icon button">
          <i class="attach icon"></i>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadTest;
