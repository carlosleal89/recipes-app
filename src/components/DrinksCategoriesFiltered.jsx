import React, { useContext } from 'react';
import DrinksContext from '../context/DrinksContext';
import DrinksCategories from './DrinksCategories';

export default function MealsCategoriesFiltered() {
  const { drinksCategoriesFilter } = useContext(DrinksContext);

  //   useEffect(() => {
  //     fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setMealsCategoriesFilter);
  //   }, []);
  console.log(drinksCategoriesFilter);
  return (
    <div>
      <DrinksCategories />
      {drinksCategoriesFilter.map((drink, index) => (
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
