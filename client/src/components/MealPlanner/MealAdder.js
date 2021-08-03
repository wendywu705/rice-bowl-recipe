import React from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;

const onSearch = (value) => {
  console.log(value);
};

const MealAdder = () => {
  return (
    <div>
      <h1>Add a Meal</h1>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <h2>Content Title</h2>
      <p>Content Lorem ipsum dolor sit amet, consectetur adipiscing</p>
      <p>Content Lorem ipsum dolor sit amet, consectetur adipiscing</p>
      <p>Content Lorem ipsum dolor sit amet, consectetur adipiscing</p>
    </div>
  );
};

export default MealAdder;
