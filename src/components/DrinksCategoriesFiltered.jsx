import React, { useContext } from 'react';
import DrinksContext from '../context/DrinksContext';
import DrinksCategories from './DrinksCategories';

export default function DrinksCategoriesFiltered() {
  const { drinksCategoriesFilter } = useContext(DrinksContext);
  const MEALS_LIST_MAX_LENGTH = 12;
  //   useEffect(() => {
  //     fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setMealsCategoriesFilter);
  //   }, []);
  console.log(drinksCategoriesFilter);
  return (
    <div>
      <DrinksCategories />
      {drinksCategoriesFilter.slice(0, MEALS_LIST_MAX_LENGTH).map((drink, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            data-testid={ `${index}-card-img` }
            alt={ drink.srtDrink }
            src={ drink.strDrinkThumb }
          />
          <p data-testid={ `${index}-card-name` }>
            { drink.strDrink }
          </p>
        </div>))}
    </div>
  );
}
