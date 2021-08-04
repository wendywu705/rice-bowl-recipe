import Ratings from 'react-ratings-declarative';

const ShowStars = (props) => {
  return (
    <span className="tileInfo">
      <Ratings
        name="ratings"
        rating={props.rating}
        widgetRatedColors="#1C94FC"
        widgetDimensions="20px"
        widgetSpacings="1px"
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings><br/>
      {props.votes} 
      {((props.votes === 1) ? " vote" : " votes") + " "}
      -{" "+(((props.rating)/5)*100).toFixed(0)}%                                              
    </span>
  );
}

export default ShowStars;