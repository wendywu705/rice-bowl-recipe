import React, { useEffect } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const Searcher = ({
  reList,
  value,
  setValue,
  filteredList,
  setFilteredList,
}) => {
  const findTag = (recipe) => {
    for (let tag of recipe['category']) {
      if (tag.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (value === '') {
      setFilteredList(reList);
    } else {
      setFilteredList(
        reList.filter((recipe) => {
          findTag(recipe);
          return (
            recipe['name'].toLowerCase().includes(value.toLowerCase()) ||
            findTag(recipe)
          );
        })
      );
    }
  }, [value, reList]);

  useEffect(() => {}, []);
  const onSearch = (value) => {
    console.log(value);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Search
      style={{ marginBottom: '1.5em' }}
      placeholder="Search a recipe"
      onSearch={onSearch}
      value={value}
      onChange={handleChange}
      enterButton
    />
  );
};

export default Searcher;
