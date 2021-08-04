import React from 'react';
import { Input, Space } from 'antd';
import MealSnippet from './MealSnippet';

const { Search } = Input;

const onSearch = (value) => {
  console.log(value);
};

const MealAdder = (props) => {
  return (
    <div style={{ width: '500px', maxHeight: '700px' }}>
      <h1>Add a Meal</h1>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <h2>Recently Viewed</h2>
      <MealSnippet
        setOpenPopup={props.setOpenPopup}
        listId={props.listId}
        title={props.title}
      />
    </div>
  );
};

export default MealAdder;
