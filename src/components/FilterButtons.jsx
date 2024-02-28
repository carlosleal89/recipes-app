import React from 'react';
import PropTypes from 'prop-types';

function FilterButtons({ setStateFunction }) {
  const filterButtons = ['All', 'Meal', 'Drink'];

  const handleClickFilter = (filter) => {
    if (filter === 'All') {
      const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
      return setStateFunction(localStorageData);
    }
    if (filter === 'Meal') {
      const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const mealFilter = localStorageData.filter((e) => e.type === 'meal');
      return setStateFunction(mealFilter);
    }
    const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const drinkFilter = localStorageData.filter((e) => e.type === 'drink');
    setStateFunction(drinkFilter);
  };

  return (
    <div className="container__filter-buttons">
      {
        filterButtons.map((element, index) => (
          <button
            onClick={ () => handleClickFilter(element) }
            key={ `${index}${element}` }
            data-testid={ `filter-by-${element.toLowerCase()}-btn` }
            className="filter-btn"
          >
            {element}
          </button>
        ))
      }
    </div>
  );
}

FilterButtons.propTypes = {
  setStateFunction: PropTypes.func.isRequired,
};

export default FilterButtons;
