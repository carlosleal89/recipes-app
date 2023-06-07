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
  } = useContext(DrinkContext);

  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const clickHandler = (category) => {
    fetchData(`${URL}${category}`, setDrinksCategoriesFilter);
    setShowDrinkCategoriesFilter(false);
  };

  useEffect(() => {
    fetchData('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', setDrinksCategories);
  }, []);

  return (
    <div>
      <button
        onClick={ () => setShowDrinkCategoriesFilter(true) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        drinksCategories.map((category, index) => (
          <button
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
