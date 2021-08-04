export const updateList = (value, ratio) => {
  if (!value) {
    return 0;
  }
  return +(value && value * ratio).toFixed(2);
};


const ListIngredients = (props) => {
  console.log('ingredients', props)
  return (
    <div className="IngredientList">
    <h3 className="subHeader">
      Ingredients:
      {props && props.ingredients &&
        props.ingredients.map((data) => (
          <div className="foodList">
            {updateList(data.quantity, props.editRatio)}
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