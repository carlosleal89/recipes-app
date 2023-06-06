import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TitleContext from '../context/TitleContext';
import useFetch from '../hooks/useFetch';
import { fetchMeals, fetchRecipe } from '../helpers/API_URL';
import MealsContext from '../context/MealsContext';
import DrinkContext from '../context/DrinksContext';

function Recipes() {
  const { setTitle } = useContext(TitleContext);
  const { mealList, setMealList } = useContext(MealsContext);
  const { drinkList, setDrinkList } = useContext(DrinkContext);
  const location = useLocation();

  const { fetchData } = useFetch();

  useEffect(() => {
    if (location.pathname === '/meals') {
      setTitle('Meals');
    }
    if (location.pathname === '/drinks') {
      setTitle('Drinks');
    }
    fetchData(fetchRecipe('https://www.themealdb.com/api/json/v1/1/search.php?s='), setMealList);
    // fetchData(fetchRecipe('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='), setDrinkList);
  }, [setTitle, location]);
  const { meals } = mealList;
  // const { drinks } = drinkList;
  return (
    <div>
      <Header />
      <div>
        <h1>
          {
            location.pathname === '/meals'
            && meals.map((recipe, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ index }>
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ recipe.srtMeal }
                  src={ recipe.strMealThumb }
                />
                <p data-testid={ `${index}-card-name` }>
                  { recipe.strMeal }
                </p>
              </div>
            ))
          }
          {
            location.pathname === '/drinks' && console.log(drinkList)
          }
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;

// fetchMealsByCategory,
// fetchMealsById,
// fetchDrinks,
// fetchDrinksByCategory,
// fetchDrinksById,
// fetchRecipe
