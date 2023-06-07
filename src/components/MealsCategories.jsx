import React, { useContext, useEffect } from 'react';
import MealsContext from '../context/MealsContext';
import useFetch from '../hooks/useFetch';

export default function MealsCategories() {
  const { fetchData } = useFetch();
  const {
    mealsCategories,
    setMealsCategories,
    setMealsCategoriesFilter,
    setShowMealCategoriesFilter,
    showMealCategoriesFilter,
  } = useContext(MealsContext);

  const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const clickHandler = (category) => {
    fetchData(`${URL}${category}`, setMealsCategoriesFilter);
    setShowMealCategoriesFilter(!showMealCategoriesFilter);
  };

  useEffect(() => {
    fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setMealsCategories);
  }, []);

  return (
    <div>
      <button
        onClick={ () => {
          setShowMealCategoriesFilter(true);
        } }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        mealsCategories.map((category, index) => (
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
