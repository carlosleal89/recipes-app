import React, { useContext, useEffect } from 'react';
import DrinkContext from '../context/DrinksContext';
import useFetch from '../hooks/useFetch';

export default function DrinksCategories() {
  const { fetchData } = useFetch();
  const { drinksCategories, setDrinksCategories } = useContext(DrinkContext);

  useEffect(() => {
    fetchData('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', setDrinksCategories);
  }, []);
  return (
    <div>
      {
        drinksCategories.map((category, index) => (
          <button data-testid={ `${category.strCategory}-category-filter` } key={ index }>
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}
