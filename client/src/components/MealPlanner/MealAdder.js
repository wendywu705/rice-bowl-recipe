import React from 'react';
import { Input, Space } from 'antd';
import MealSnippet from './MealSnippet';

const { Search } = Input;

const onSearch = (value) => {
  console.log(value);
};

const MealAdder = () => {
  return (
    <div style={{ width: '500px', maxHeight: '700px' }}>
      <h1>Add a Meal</h1>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <h2>Recently Viewed</h2>
      <MealSnippet />
      <MealSnippet />
      <MealSnippet />
      <MealSnippet />
      <MealSnippet />
      <MealSnippet />
      <MealSnippet />
    </div>
  );
};

export default MealAdder;
