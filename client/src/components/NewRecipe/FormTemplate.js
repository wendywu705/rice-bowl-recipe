import { UploadOutlined } from '@ant-design/icons';
import './Form.css';
import '../Layout/Footer.css'

import { 
  Input, 
  Upload,
  Button, 
  InputNumber, 
  Checkbox, 
  Row, 
  Col, 
  Divider 
} from 'antd';

const { TextArea } = Input;

const FormTemplate = (props) => {
  let state = props.data;
  return(
    <div>
      { state &&
        <div>
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
          </label>
          <Divider style={{marginBottom:10}} />
          <label className="image">
            Image: 
            <Upload
              listType="picture"
              className="upload-list-inline"
              onChange={props.handle}
              beforeUpload={() => false}
              maxCount={1}
              // fileList={props.pic}
              fileList={props.pic}
            >
              {console.log('pic',props.pic)}
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
                    onChange={(value) => props.num('cookHour', value)}
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
                    onChange={(value) => props.num('servingSize', value)}
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
                    onChange={(value) => props.num('prepMin', value)}
                    // onChange={(value) => setState({...state, "prepMin" : value})}
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
                    onChange={(value) => props.num('cookMin', value)}
                    // onChange={(value) => setState({...state, "cookMin" : value})}
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
                    disabled={props.type==="edit" ? true : false}
                    onChange={(value) => props.num('rating', value)}
                    // onChange={(value) => setState({...state, "rating" : value})}
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
        </div>
      }
    </div>
  );
};

export default FormTemplate;