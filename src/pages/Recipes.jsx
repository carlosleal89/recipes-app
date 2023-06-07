import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
// import MealsCategories from '../components/MealsCategories';
// import DrinksCategories from '../components/DrinksCategories';
import MealsContext from '../context/MealsContext';
import MealsCategoriesFiltered from '../components/MealsCategoriesFiltered';
import DrinksCategoriesFiltered from '../components/DrinksCategoriesFiltered';

function Recipes() {
  const location = useLocation();
  const {
    showMealCategoriesFilter,
    showDrinkCategoriesFilter,
  } = useContext(MealsContext);
  console.log(showDrinkCategoriesFilter);

  return (
    <div>
      <Header />
      <div>
        <h1>
          {
            showMealCategoriesFilter
              ? (location.pathname === '/meals'
            && (
              <Meals />
            )) : (<MealsCategoriesFiltered />)
          }
          {/* {location.pathname === '/drinks'
          &&
          (<Drinks />)} */}
          {
            showDrinkCategoriesFilter
              ? (location.pathname === '/drinks'
          && (
            <Drinks />
          )) : (<DrinksCategoriesFiltered />)
          }
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
