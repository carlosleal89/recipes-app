import React, { useContext, useEffect } from 'react';
import MealsContext from '../context/MealsContext';
import useFetch from '../hooks/useFetch';
import '../css/MealsCategories.css';

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
    if (showMealCategoriesFilter.category === '') {
      fetchData(`${URL}${category}`, setMealsCategoriesFilter);
      return setShowMealCategoriesFilter({ show: true, category });
    }
    if (showMealCategoriesFilter.category === category) {
      return setShowMealCategoriesFilter({ show: false, category: '' });
    }
    fetchData(`${URL}${category}`, setMealsCategoriesFilter);
    return setShowMealCategoriesFilter({ show: true, category });
  };

  useEffect(() => {
    fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setMealsCategories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="category-btn-container">
      <button
        onClick={ () => {
          setShowMealCategoriesFilter({ category: '', show: false });
        } }
        className="all-meals-btn-filter"
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        mealsCategories.map((category, index) => (
          <button
            key={ index }
            className={ `${category.strCategory}-btn-filter` }
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
