import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import CardFinishedRecipes from '../components/CardFinishedRecipes';
import '../css/DoneRecipes.css';

function DoneRecipes() {
  const { setTitle } = useContext(TitleContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setTitle('Done Recipes');
    setFilteredRecipes(doneRecipes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterByAll = () => {
    setFilteredRecipes(doneRecipes);
  };

  const handleFilterByMeal = () => {
    const mealRecipes = doneRecipes.filter((recipe) => recipe.type === 'meal');
    setFilteredRecipes(mealRecipes);
  };

  const handleFilterByDrink = () => {
    const drinkRecipes = doneRecipes.filter((recipe) => recipe.type === 'drink');
    setFilteredRecipes(drinkRecipes);
  };

  return (
    <div>
      <Header />
      <div className="button-container">
        <button
          className="button-categories"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilterByAll() }
        >
          All
        </button>
        <button
          className="button-categories"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilterByMeal() }
        >
          Meals
        </button>
        <button
          className="button-categories"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterByDrink() }
        >
          Drinks
        </button>
      </div>
      {filteredRecipes
      && filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <CardFinishedRecipes recipe={ recipe } index={ index } />
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
