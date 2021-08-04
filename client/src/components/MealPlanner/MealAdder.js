import React, { useState, useEffect } from 'react';
import MealSnippet from './MealSnippet';
import Searcher from './Searcher';

const MealAdder = (props) => {
  const [filteredList, setFilteredList] = useState([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    console.log('Hello');
  }, []);

  return (
    <div style={{ height: '700px', width: '500px', maxHeight: '700px' }}>
      <h1>Add a Meal</h1>
      <Searcher
        value={value}
        setValue={setValue}
        filteredList={filteredList}
        setFilteredList={setFilteredList}
        reList={props.recipes}
      />
      {filteredList.map((recipe) => {
        return (
          <MealSnippet
            setOpenPopup={props.setOpenPopup}
            listId={props.listId}
            title={props.title}
            recipe={recipe}
          />
        );
      })}
      <h2>Recently Viewed</h2>
    </div>
  );
};

export default MealAdder;
