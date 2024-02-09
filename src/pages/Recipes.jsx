import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import MealsContext from '../context/MealsContext';
import DrinkContext from '../context/DrinksContext';
import MealsCategoriesFiltered from '../components/MealsCategoriesFiltered';
import DrinksCategoriesFiltered from '../components/DrinksCategoriesFiltered';
import fetchDataAux from '../utils/fetchDataAux';
import '../css/Recipes.css';

function Recipes() {
  const location = useLocation();
  const {
    setMealList,
    showMealCategoriesFilter,
  } = useContext(MealsContext);
  const {
    setDrinkList,
    showDrinkCategoriesFilter,
  } = useContext(DrinkContext);

  useEffect(() => {
    const getApiData = async () => {
      const mealData = await fetchDataAux('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setMealList(mealData.meals);

      const drinkData = await fetchDataAux('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinkList(drinkData.drinks);
    };
    getApiData();
  }, []);

  return (
    <div className="recipe-page-container">
      <Header />
      <div>
        {
          location.pathname === '/meals'
          && (
            showMealCategoriesFilter ? (
              <Meals />
            ) : (<MealsCategoriesFiltered />)
          )
        }
        {
          location.pathname === '/drinks'
        && (
          showDrinkCategoriesFilter ? (
            <Drinks />
          ) : (<DrinksCategoriesFiltered />)
        )
        }
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
