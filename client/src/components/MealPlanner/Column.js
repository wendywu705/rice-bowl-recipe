import React from 'react';

const Column = ({ isHovered, children }) => {
  const className = isHovered ? ' highlight-region' : '';

  return <div className={`col${className}`}>{children}</div>;
};

export default Column;
