const ListIngredients = (props) => {
  console.log('ingredients', props)
  const updateList = (value) => {
    if (!value) {
      return 0;
    }
    return +(value && value * props.editRatio).toFixed(2);
  };
  return (
    <div className="IngredientList">
    <h3 className="subHeader">
      Ingredients:
      {props && props.ingredients &&
        props.ingredients.map((data) => (
          <div className="foodList">
            {updateList(data.quantity)}
            {data.unitOfMeasure
              ? ' ' + data.unitOfMeasure + ' ' + data.description
              : ' ' + data.description}
          </div>
        ))}
    </h3>
  </div>
  );
}

export default ListIngredients;