import React, { useContext, useEffect } from 'react';
import MealsContext from '../context/MealsContext';
import useFetch from '../hooks/useFetch';

export default function MealsCategories() {
  const { fetchData } = useFetch();
  const { mealsCategories, setMealsCategories } = useContext(MealsContext);

  useEffect(() => {
    fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setMealsCategories);
  }, []);
  console.log(mealsCategories);
  return (
    <div>
      {
        mealsCategories.map((category, index) => (
          <button data-testid={ `${category.strCategory}-category-filter` } key={ index }>
            {category.strCategory}
          </button>
        ))
      }
    </div>
  );
}
