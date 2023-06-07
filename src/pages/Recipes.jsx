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
  const { showMealCategoriesFilter,
    showDrinksCategoriesFilter,
  } = useContext(MealsContext);

  return (
    <div>
      <Header />
      <div>
        <h1>
          {
            showMealCategoriesFilter
              ? (location.pathname === '/meals'
            && (
              <div>
                <Meals />
              </div>
            )) : (<MealsCategoriesFiltered />)
          }
          {
            showDrinksCategoriesFilter
              ? (location.pathname === '/drinks'
          && (
            <div>
              <Drinks />
            </div>
          )) : (<DrinksCategoriesFiltered />)
          }
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
