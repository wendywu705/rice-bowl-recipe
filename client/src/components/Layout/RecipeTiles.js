import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import ShowStars from '../Ratings/Ratings';

const RecipeTiles = (prop) => {
  return (
    <Row gutter={[10, 25]}>
      {prop.data.map((res) => (
          <Col className="recipe-row" span={6}>
              <div className="browseTile">
                  <Link to= {`recipe/${res.recipeId}`}>
                      <div className="tileContent">
                          <h5 style={{
                            color:'black',
                            padding:'0 20px 0 20px',
                            textTransform:'uppercase'
                          }}>{res.name}</h5>
                          <img 
                            className="tileImage" 
                            src={res.imageUrl} 
                            alt="Recipe thumbnail"
                          /><br/>
                          {res.meta &&
                            <ShowStars 
                              votes={res.meta.votes} 
                              rating={res.meta.rating}
                            />
                          }                                            
                      </div>
                  </Link>
              </div>
          </Col>
      ))}
  </Row>
  );
}
export default RecipeTiles;