import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import MealsContext from '../context/MealsContext';
import DrinkContext from '../context/DrinksContext';
import MealsCategoriesFiltered from '../components/MealsCategoriesFiltered';
import DrinksCategoriesFiltered from '../components/DrinksCategoriesFiltered';
import '../css/Recipes.css';

function Recipes() {
  const location = useLocation();
  const {
    showMealCategoriesFilter,
  } = useContext(MealsContext);
  const {
    showDrinkCategoriesFilter,
  } = useContext(DrinkContext);

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
