import PropTypes from 'prop-types';
import React from 'react';
import { Carousel } from 'react-bootstrap';

function Recommendation({ recommendation }) {
  const MEALS_LIST_MAX_LENGTH = 6;
  return (

    <div className="container__recipe-recommended">
      <h3 className="text-center">Recommended</h3>
      <Carousel>

        { // card - recommendation
          recommendation
            .slice(0, MEALS_LIST_MAX_LENGTH).map((recom, index) => (
              <Carousel.Item
                className="recommendation-card"
                data-testid={ `${index}-recommendation-card` }
                key={ index }
              >
                <img
                  className="d-block mx-auto"
                  alt={ recom.strMeal || recom.strDrink }
                  src={ recom.strMealThumb || recom.strDrinkThumb }
                />
                <p
                  className="text-center"
                  data-testid={ `${index}-recommendation-title` }
                >
                  { recom.strMeal || recom.strDrink }
                </p>
              </Carousel.Item>
            ))
        }
      </Carousel>
    </div>
  );
}

Recommendation.propTypes = {
  recommendation: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default Recommendation;
