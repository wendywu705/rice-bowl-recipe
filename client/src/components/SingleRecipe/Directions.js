const ListDirections = (prop) => {
  return (
    <ol>
      { prop.directions &&
        prop.directions.map((data, index) => (
          <li className="directionContainer">
            <div className="stepNumber">{index + 1}</div>
            <div className="stepContent">{data}</div>
          </li>
        ))}
    </ol>
  );
};

export default ListDirections;