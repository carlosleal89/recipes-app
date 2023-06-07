import React, { useContext, useEffect } from 'react';
import DrinkContext from '../context/DrinksContext';
import useFetch from '../hooks/useFetch';

export default function DrinksCategories() {
  const { fetchData } = useFetch();
  const {
    drinksCategories,
    setDrinksCategories,
    setDrinksCategoriesFilter,
    setShowDrinkCategoriesFilter,
    showDrinkCategoriesFilter,
  } = useContext(DrinkContext);

  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const clickHandler = (category) => {
    fetchData(`${URL}${category}`, setDrinksCategoriesFilter);
    setShowDrinkCategoriesFilter(!showDrinkCategoriesFilter);
  };

  useEffect(() => {
    fetchData('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', setDrinksCategories);
  }, []);

  return (
    <div>
      <button
        style={ {
          fontSize: 15,
          fontStyle: 'italic',
          padding: 0,
          margin: 0,
          marginLeft: '1rem',
          marginRight: '0.5rem',
        } }
        onClick={ () => setShowDrinkCategoriesFilter(true) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        drinksCategories.map((category, index) => (
          <button
            style={ {
              fontSize: 15,
              fontStyle: 'italic',
              padding: 0,
              margin: 0,
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            } }
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={
              () => clickHandler(category.strCategory)
            }
          >
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}
