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
  useEffect(() => {
    if (value === '') {
      setFilteredList(reList);
    } else {
      setFilteredList(
        reList.filter((recipe) =>
          recipe['name'].toLowerCase().includes(value.toLowerCase())
        )
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
