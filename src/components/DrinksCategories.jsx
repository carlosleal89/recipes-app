import React, { useContext, useEffect } from 'react';
import DrinkContext from '../context/DrinksContext';
import useFetch from '../hooks/useFetch';
import '../css/DrinksCategories.css';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regex = /^(\S+)/;

  return (
    <div className="category-btn-container">
      <button
        onClick={ () => setShowDrinkCategoriesFilter(true) }
        data-testid="All-category-filter"
        className="all-drink-btn-filter"
      >
        All
      </button>
      {
        drinksCategories.map((category, index) => (
          <button
            key={ index }
            className={ `${category.strCategory}-btn-filter` }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={
              () => clickHandler(category.strCategory)
            }
          >
            {category.strCategory.match(regex)?.[1]}
          </button>
        ))
      }
    </div>
  );
}
