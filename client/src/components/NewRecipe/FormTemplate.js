import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import '../Layout/Footer.css'
// import FormTemplate from './FormTemplate';

import './Form.css';
import '../Layout/Footer.css'

import { Input, Upload, Button, InputNumber, Checkbox, Row, Col, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;



const { v4: uuidv4 } = require('uuid');

const FormTemplate = (props) => {
  // const [state, setState] = useState({
  //   name: '',
  //   ingredients: '',
  //   prepHour: 0,
  //   prepMin: 0,
  //   cookHour: 0,
  //   cookMin: 0,
  //   servingSize: 1,
  //   directions: [],
  //   url: '',
  //   imageUrl: '',
  //   rating: 5,
  //   category: '',
  //   hidden: false,
  //   errors: {},
  // });
  // // Holds the uploaded image file in a state
  // let [selectedFile, setSelectedFile] = useState(null);
  // const { id } = useParams();

  // const test = async () => {
  //   const res = await axios.get('https://localhost:9000/home/');
  //   console.log('heyo', res);
  //   if (state.hidden){
  //     document.getElementById('checkbox').checked = true;
  //   } else {
  //     document.getElementById('checkbox').checked = false;
  //   }
  // };
  // const parseDirections = (dir) => {
  //   let resDir = ""
  //   for (let i=0; i<dir.length; i++) {
  //     console.log('part dir', dir[i])
  //     resDir += dir[i]
  //     if (i < dir.length-1) {
  //       resDir += "\n"
  //     }
  //   }
  //   return resDir;
  // }

  // const editRequest = async () => {
  //   try{
  //     const editResponse = await axios({
  //       method: 'get',
  //       timeout: 1000,
  //       url: `https://localhost:9000/recipes/edit/${id}`
  //     });
  //     if( [200, 304].includes(editResponse.status)){
  //       console.log('mesg from edit', editResponse.data);
  //       Object.values(editResponse).map((res) => {
  //         let ingre_string = '';
  //         if (res.ingredients != null && res.ingredients != undefined){
  //           Object.values(res.ingredients).map((ing) => {
  //             let quantity = ing.quantity ? ing.quantity : 0;
  //             let description = ing.description ? ing.description : '';
  //             let unit = ing.unitOfMeasure ? ing.unitOfMeasure : '';
  //             ingre_string += quantity + ' ' + unit + ' ' + description + '\n';
  //           })
  //         }
  //         // console.log(res.directions.toString());
  //         setState({
  //           ...state,
  //           name: res.name,
  //           imageUrl: res.imageUrl,
  //           category: res.category,
  //           ingredients: ingre_string,
  //           prepMin: res.time.prepMin,
  //           prepHour: res.time.prepHour,
  //           cookHour: res.time.cookHour,
  //           cookMin: res.time.cookMin,
  //           servingSize: res.servingSize,
  //           rating: res.meta.rating, //TODO: change so that the author cannot change rating
  //           directions: parseDirections(res.directions),
  //           url: res.url ? res.url : '',
  //           hidden: res.hidden,
  //           recipeId: res.recipeId
  //         });
  //       });
  //     }
  //   } catch (err){
  //     console.log('err',err);
  //   }
  // }

  // useEffect(() => {
  //   editRequest();
  //   test();
  // }, []);

  // // Form data to be embedded in post requests
  // let formData = new FormData();
  // let recipeData = new FormData();
  // let newFileName = '';

  // // Handles the AJAX request for uploading the user image
  // const uploadRequest = async () => {
  //   try{
  //     const response = await axios({
  //       method: 'post',
  //       timeout: 1000,
  //       url: `https://localhost:9000/api/imageupload`,
  //       data: formData,
  //     });
  //     if (response.status === 200){
  //       console.log('res',response);
  //       return response.data;
  //     }
  //     return null;
  //   } catch (err){
  //     console.log('err',err);
  //     return null;
  //   }
  // };

  // // Handles the AJAX request for uploading the recipe data
  // const recipeEdit = async () => {
  //   console.log('recipeData', recipeData)
  //   try{
  //     const response = await axios({
  //       method: 'post',
  //       timeout: 2000,
  //       url: `https://localhost:9000/recipes/edit/${id}`,
  //       data: recipeData,
  //     });
  //     if ( [200, 304].includes(response.status) ){
  //       console.log('res',response);
  //       return response.data;
  //     }
  //     return null;
  //   } catch (err){
  //     console.log('err',err);
  //     console.log('err code',err.code);
  //     console.log('err msg',err.message);
  //     console.log('err stack',err.stack);
  //     return null;
  //   }
  // };

  // // Track the uploaded image as a state
  // const onChangeHandler = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  // // General handle change function to update each corresponding value in recipe state
  // function handleChange(event) {
  //   const value = event.target.value;
  //   setState({
  //     ...state,
  //     [event.target.name]: value,
  //   });
  // }

  // function handleCheckBox(event) {
  //   handleChange(event);
  //   const hidden = document.getElementById('hidden');
  //   if (hidden) {
  //     hidden.value = hidden !== true;
  //   }
  // }

  // function handleValidation() {
  //   let formIsValid = true;
  //   state.errors = {};

  //   //Name
  //   if(state.name.length<1){
  //     formIsValid = false;
  //     state.errors["name"] = "Cannot be empty";
  //   }

  //   //category
  //   if (state.category.length<1){
  //     formIsValid = false;
  //     state.errors["category"] = "Cannot be empty";
  //   }

  //   //ingredients
  //   if (state.ingredients.length<1){
  //     formIsValid = false;
  //     state.errors["ingredients"] = "Cannot be empty";
  //   }

  //   //instructions
  //   if (state.directions.length<1){
  //     formIsValid = false;
  //     state.errors["directions"] = "Cannot be empty";
  //   }

  //   //ServingSize
  //   if (state.servingSize<1){
  //     formIsValid = false;
  //     state.errors["servingSize"] = "Cannot be less than 1";
  //   }

  //   //rating
  //   if (state.rating<0 || state.rating>5){
  //     formIsValid = false;
  //     state.errors["rating"] = "Must be between 0 and 5";
  //   }

  //   //time
  //   if (state.prepHour<0 || state.prepMin<0 || state.cookHour<0 || state.cookMin<0){
  //     formIsValid = false;
  //     state.errors["time"] = "Time cannot be negative.";
  //   }

  //   //url
  //   let valid = /^(https?:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/;
  //   if (state.url.length>0) {
  //     if (!valid.exec(state.url)) {
  //       state.errors["url"] = "Invalid youtube url";
  //     }
  //   }

  //   return formIsValid;
  // }

  // // Handles 2 AJAX request, one for uploading the image to GCS, and other for uploading the recipe data
  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  //   //form validation
  //   if(!handleValidation()){
  //     console.log('Form validation failed');
  //     console.log('errors:',state.errors);
  //     let errors = JSON.stringify(state.errors).replace(/\\n/g, "\\n");
  //     alert(`Form has errors. Cannot submit.\n ${errors}`)
  //     return;
  //   }
  //   let tempData;
  //   let userData;

  //   // Create a unique imageURL for each image
  //   //if no image inserted
  //   if (!selectedFile){
  //     console.log('did not change the image, use the old one')
  //   }
  //   //image is inserted
  //   else{
  //     console.log('image inserted');
  //     newFileName = uuidv4() + '-' + selectedFile.name;
  //     userData = {
  //       imageName: newFileName,
  //     };
  //     tempData = {
  //       ...state,
  //       imageUrl: `https://storage.googleapis.com/ricebowl-bucket-1/${newFileName}`,
  //     };
  //     setState(tempData);
  //     console.log('tempData', tempData)
  //     formData.append('file', selectedFile);
  //     formData.append('data', JSON.stringify(userData));
  //     let uploadRes = uploadRequest();
  //     if (!uploadRes){
  //       alert('image submission FAILED!');
  //     }
  //   }
  //   console.log('pre data', JSON.stringify(tempData))
  //   recipeData.append('data', JSON.stringify(state));
  //   let recipeResId = await recipeEdit();
  //   if (recipeResId){
  //     alert('Recipe submitted successfully!');
  //     console.log('edited recipe_id',recipeResId);
  //     window.location.assign(`../${recipeResId}`);
  //   }
  //   else{
  //     alert('Recipe submission FAILED!\nMake sure recipe has ingredients and directions');
  //   }
  // };
  let state = props.data;
  // let handleChange = props.update;
  // let handleCheckBox = props.check;
  // let handleSubmit = props.handleSubmit
  // let onChangeHandler = props.handle


  // let state = props.data

  return(
    // <form id="recipeForm" encType="multipart/form-data" method="POST">
    <div className="Form" id="pageContainer">
      {/* {console.log('SELECTEDFILE', selectedFile)} */}
      <div>
        <h1 className="new-recipes-title">New Recipe:</h1>
        <form id="recipeForm" encType="multipart/form-data" method="POST">
          <label className="recipe-name-title">
            Recipe Name: <br />
            <Input
                className="inputBox"
                type="text"
                name="name"
                value={state.name}
                onChange={props.update}
                placeholder="Enter Recipe Title"
                required="required"
            />
          </label>{' '}
          <Divider style={{marginBottom:10}} />
          <label className="image">
            Image: 
            <Upload
              listType="picture"
              className="upload-list-inline"
              onChange={props.handle}
              // onChange={onChangeHandler}
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button 
                className="uploadButton"
                icon={<UploadOutlined />}
                size="large"
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Upload
              </Button>
            </Upload>
          </label>
          <Divider style={{marginBottom:10}} />
          <label className="Category">
            Categories: <br />
            <Input
                className="inputBox"
                type="text"
                name="category"
                value={state.category}
                onChange={props.update}
                placeholder="Enter Categories seperated by commas. eg) Chinese, Cake, Fish"
            />
          </label>{' '}
          <Divider style={{marginBottom:10}} />
          <label className="Ingredients">
            Recipe Ingredients: <br />
            <TextArea
                className="inputArea"
                name="ingredients"
                id="ingredientsId"
                // value={"1 item\n2 item\n3 items"}
                value={state.ingredients}
                onChange={props.update}
                placeholder="quantity/unit/ingredient&#13;3 cups carrots &#13;2 eggs &#13;5 cloves garlic &#13;etc..."
                required
            />
          </label>{' '}
          <br />
          {console.log('state', state)}
          <Divider style={{marginBottom:10}} />
          <Row gutter={[10, 8]} className="numClass">
          <Col span={8} className="col">
              <label className="Prep" id="numLabel">
                Prep Hours:
                <InputNumber
                    className="inputNumber"
                    type="number"
                    name="prepHour"
                    value={state.prepHour}
                    onChange={(value) => props.num('prepHour', value)}
                    // onChange={(value) => setState({...state, "prepHour" : value})}
                    min={0}
                    defaultValue={0}
                />
              </label>
            </Col>

            <Col span={8} className="col">
              <label className="Cook" id="numLabel">
                Cook Hours:
                <InputNumber
                    className="inputNumber"
                    type="number"
                    name="cookHour"
                    value={state.cookHour}
                    // onChange={handleChange}
                    // onChange={(value) => setState({...state, "cookHour" : value})}
                    min={0}
                    defaultValue={0}
                />
              </label>
            </Col>
            <Col span={8} className="col">
              <label className="Serving-Size" id="numLabel">
                Serving Size:
                <InputNumber
                    className="inputNumber"
                    type="number"
                    name="servingSize"
                    value={state.servingSize}
                    // onChange={(value) => setState({...state, "servingSize" : value})}
                    // onChange={handleChange}
                    min={1}
                    defaultValue={1}
                />
              </label>
            </Col>

            <Col span={8} className="col">
              <label className="Prep" id="numLabel">
                Prep Mins:
                <InputNumber
                    className="inputNumber"
                    type="number"
                    name="prepMin"
                    value={state.prepMin}
                    // onChange={(value) => setState({...state, "prepMin" : value})}
                    // onChange={handleChange}
                    min={0}
                    max={59}
                    defaultValue={0}
                />
              </label>{' '}
            </Col>
            <Col span={8} className="col">
              <label className="Cook" id="numLabel">
                Cook Mins:
                <InputNumber
                    className="inputNumber"
                    type="number"
                    name="cookMin"
                    value={state.cookMin}
                    // onChange={(value) => setState({...state, "cookMin" : value})}
                    // onChange={handleChange}
                    min={0}
                    max={59}
                    defaultValue={0}
                />
              </label>{' '}
            </Col>
            <Col span={8} className="col">
              <label className="Rating" id="numLabel">
                Rating:
                <InputNumber
                    className="inputNumber"
                    type="number"
                    name="rating"
                    value={state.rating}
                    // onChange={(value) => setState({...state, "rating" : value})}
                    // onChange={handleChange}
                    min={0}
                    max={5}
                    defaultValue={5}
                />
              </label>{' '}
            </Col>
          </Row>
          <Divider style={{marginBottom:10}} />
          <label>
            Recipe Steps: <br />
            <TextArea
                className="inputArea"
                name="directions"
                value={state.directions}
                onChange={props.update}
                placeholder="Chop up all carrots and garlic. &#13;&#13;Pour water over the carrots and add along the chopped garlic."
                required
            />
          </label>{' '}
          <Divider style={{marginBottom:10}} />
          <label className="url">
            Video Clip: <br />
            <Input
                className="inputBox"
                type="text"
                name="url"
                value={state.url}
                onChange={props.update}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
          </label>{' '}
          {/* <br /> */}
          <Divider style={{marginBottom:10}} />

          <label className="hidden">
            Only Private View?
            <Checkbox
                className="checkBox"
                id="checkbox"
                type="checkbox"
                name="hidden"
                // value="true"
                onChange={props.check}
                defaultValue={false}
            />
          </label>{' '}
          <br />
          <div className="align-center">
            <Button 
              className="Submit" 
              type="primary" 
              htmlType="submit" 
              onClick={props.submit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>

    
    
    // <div>
    //     <label className="recipe-name-title">
    //       Recipe Name: <br />
    //       <input
    //           className="inputBox"
    //           type="text"
    //           name="name"
    //           value={state.name}
    //           onChange={props.check}
    //           placeholder="Enter Recipe Title"
    //           required="required"
    //       />
    //     </label>{' '}
    //     <br />
    //     Image: <br />
    //     <div className="wrap-imge">
    //       <img id="exist-image" alt="recipe image" src={state.imageUrl}/>
    //     </div>
    //     <input type="file" name="file" className="inputBox" onChange={props.handle} />
    //     <br />
    //     <label className="Category">
    //       Categories: <br />
    //       <input
    //           className="inputBox"
    //           type="text"
    //           name="category"
    //           value={state.category}
    //           onChange={props.check}
    //           placeholder="Enter Categories seperated by commas. eg) Chinese, Cake, Fish"
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="Ingredients">
    //       Recipe Ingredients: <br />
    //       <textarea
    //           className="inputBox"
    //           name="ingredients"
    //           value={state.ingredients}
    //           onChange={props.check}
    //           placeholder="quantity/unit/ingredient&#13;3 cups carrots &#13;2 eggs &#13;5 cloves garlic &#13;etc..."
    //           required
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="Prep">
    //       Prep Hours:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="prepHour"
    //           value={state.prepHour}
    //           onChange={props.check}
    //           min="0"
    //       />
    //     </label>
    //     <label className="Prep">
    //       Prep Mins:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="prepMin"
    //           value={state.prepMin}
    //           onChange={props.check}
    //           min="0"
    //           max="59"
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="Cook">
    //       Cook Hours:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="cookHour"
    //           value={state.cookHour}
    //           onChange={props.check}
    //           min="0"
    //       />
    //     </label>
    //     <label className="Cook">
    //       Cook Mins:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="cookMin"
    //           value={state.cookMin}
    //           onChange={props.check}
    //           min="0"
    //           max="59"
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="Serving-Size">
    //       Serving Size:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="servingSize"
    //           value={state.servingSize}
    //           onChange={props.check}
    //           min="1"
    //       />
    //     </label>
    //     <label className="Rating">
    //       Rating:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="rating"
    //           value={state.rating}
    //           readOnly
    //       />
    //     </label>{' '}
    //     <br />
    //     <label>
    //       Recipe Steps: <br />
    //       <textarea
    //           className="inputBox"
    //           name="directions"
    //           value={state.directions}
    //           onChange={props.check}
    //           placeholder="Chop up all carrots and garlic. &#13;&#13;Pour water over the carrots and add along the chopped garlic."
    //           required
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="url">
    //       Video Clip: <br />
    //       <input
    //           className="inputBox"
    //           type="text"
    //           name="url"
    //           value={state.url}
    //           onChange={props.check}
    //           placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="hidden">
    //       <p>Only Private View?</p>
    //       <input
    //           id="checkbox"
    //           className="inputBox"
    //           type="checkbox"
    //           name="hidden"
    //           value={state.hidden}
    //           onChange={props.check}
    //       />
    //     </label>{' '}
    //     <br />
    //     <div className="align-center">
    //       <button className="Submit" type="button" onClick={props.submit}>
    //         Submit
    //       </button>
    //     </div>

    // </div>
    // <div>
    //     <label className="recipe-name-title">
    //       Recipe Name: <br />
    //       <input
    //           className="inputBox"
    //           type="text"
    //           name="name"
    //           value={state.name}
    //           onChange={handleChange}
    //           placeholder="Enter Recipe Title"
    //           required="required"
    //       />
    //     </label>{' '}
    //     <br />
    //     Image: <br />
    //     <div className="wrap-imge">
    //       <img id="exist-image" alt="recipe image" src={state.imageUrl}/>
    //     </div>
    //     <input type="file" name="file" className="inputBox" onChange={onChangeHandler} />
    //     <br />
    //     <label className="Category">
    //       Categories: <br />
    //       <input
    //           className="inputBox"
    //           type="text"
    //           name="category"
    //           value={state.category}
    //           onChange={handleChange}
    //           placeholder="Enter Categories seperated by commas. eg) Chinese, Cake, Fish"
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="Ingredients">
    //       Recipe Ingredients: <br />
    //       <textarea
    //           className="inputBox"
    //           name="ingredients"
    //           value={state.ingredients}
    //           onChange={handleChange}
    //           placeholder="quantity/unit/ingredient&#13;3 cups carrots &#13;2 eggs &#13;5 cloves garlic &#13;etc..."
    //           required
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="Prep">
    //       Prep Hours:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="prepHour"
    //           value={state.prepHour}
    //           onChange={handleChange}
    //           min="0"
    //       />
    //     </label>
    //     <label className="Prep">
    //       Prep Mins:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="prepMin"
    //           value={state.prepMin}
    //           onChange={handleChange}
    //           min="0"
    //           max="59"
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="Cook">
    //       Cook Hours:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="cookHour"
    //           value={state.cookHour}
    //           onChange={handleChange}
    //           min="0"
    //       />
    //     </label>
    //     <label className="Cook">
    //       Cook Mins:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="cookMin"
    //           value={state.cookMin}
    //           onChange={handleChange}
    //           min="0"
    //           max="59"
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="Serving-Size">
    //       Serving Size:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="servingSize"
    //           value={state.servingSize}
    //           onChange={handleChange}
    //           min="1"
    //       />
    //     </label>
    //     <label className="Rating">
    //       Rating:
    //       <input
    //           className="inputBox"
    //           type="number"
    //           name="rating"
    //           value={state.rating}
    //           readOnly
    //       />
    //     </label>{' '}
    //     <br />
    //     <label>
    //       Recipe Steps: <br />
    //       <textarea
    //           className="inputBox"
    //           name="directions"
    //           value={state.directions}
    //           onChange={handleChange}
    //           placeholder="Chop up all carrots and garlic. &#13;&#13;Pour water over the carrots and add along the chopped garlic."
    //           required
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="url">
    //       Video Clip: <br />
    //       <input
    //           className="inputBox"
    //           type="text"
    //           name="url"
    //           value={state.url}
    //           onChange={handleChange}
    //           placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    //       />
    //     </label>{' '}
    //     <br />
    //     <label className="hidden">
    //       <p>Only Private View?</p>
    //       <input
    //           id="checkbox"
    //           className="inputBox"
    //           type="checkbox"
    //           name="hidden"
    //           value={state.hidden}
    //           onChange={handleCheckBox}
    //       />
    //     </label>{' '}
    //     <br />
    //     <div className="align-center">
    //       <button className="Submit" type="submit" onClick={handleSubmit}>
    //         Submit
    //       </button>
    //     </div>

    // </div>
    // </form>

  );
}

export default FormTemplate;