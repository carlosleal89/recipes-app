import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';
import DrinksCategories from './DrinksCategories';

export default function DrinksCategoriesFiltered() {
  const { drinksCategoriesFilter } = useContext(DrinksContext);
  const MEALS_LIST_MAX_LENGTH = 12;
  //   useEffect(() => {
  //     fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setMealsCategoriesFilter);
  //   }, []);
  // console.log(drinksCategoriesFilter);
  return (
    <div>
      <DrinksCategories />
      <div
        style={
          {
            marginLeft: '10px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px' }
        }
      >
        {drinksCategoriesFilter.slice(0, MEALS_LIST_MAX_LENGTH).map((drink, index) => (
          <Link to={ `/drinks/${drink.idDrink}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <p
                style={ {
                  fontSize: 20,
                  fontStyle: 'italic',
                  padding: 0,
                  margin: 0,
                  marginLeft: '2rem',
                } }
                data-testid={ `${index}-card-name` }
              >
                { drink.strDrink }
              </p>
              <img
                style={ {
                  width: '150px',
                  height: '150px',
                  marginBottom: '20px',
                } }
                data-testid={ `${index}-card-img` }
                alt={ drink.srtDrink }
                src={ drink.strDrinkThumb }
              />
            </div>
          </Link>))}
      </div>
    </div>
  );
}
