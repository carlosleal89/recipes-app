import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TitleContext from '../context/TitleContext';
// import useFetch from '../hooks/useFetch';
// import { fetchMeals, fetchRecipe } from '../helpers/API_URL';
import MealsContext from '../context/MealsContext';
import DrinkContext from '../context/DrinksContext';

function Recipes() {
  const { setTitle } = useContext(TitleContext);
  const { mealListArray, fetchDataMeals } = useContext(MealsContext);
  const { drinkListArray, fetchDataDrinks } = useContext(DrinkContext);
  const location = useLocation();

  // const { fetchData } = useFetch();

  useEffect(() => {
    if (location.pathname === '/meals') {
      setTitle('Meals');
    }
    if (location.pathname === '/drinks') {
      setTitle('Drinks');
    }
    fetchDataMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    fetchDataDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    // fetchData(fetchRecipe('https://www.themealdb.com/api/json/v1/1/search.php?s='), setMealList);
    // fetchData(fetchRecipe('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='), setDrinkList);
  }, [setTitle, location]);
  // const { meals } = mealListArray;
  // const { drinks } = drinkListArray;
  return (
    <div>
      <Header />
      <div>
        <h1>
          {
            location.pathname === '/meals'
            && mealListArray.map((recipe, index) => (
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
            location.pathname === '/drinks'
            && drinkListArray.map((drink, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ index }>
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ drink.srtDrink }
                  src={ drink.strDrinkThumb }
                />
                <p data-testid={ `${index}-card-name` }>
                  { drink.strDrink }
                </p>
              </div>
            ))
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
