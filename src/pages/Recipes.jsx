import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
// import MealsCategories from '../components/MealsCategories';
// import DrinksCategories from '../components/DrinksCategories';
import MealsContext from '../context/MealsContext';
import DrinkContext from '../context/DrinksContext';
import MealsCategoriesFiltered from '../components/MealsCategoriesFiltered';
import DrinksCategoriesFiltered from '../components/DrinksCategoriesFiltered';

function Recipes() {
  const location = useLocation();
  const {
    showMealCategoriesFilter,
  } = useContext(MealsContext);
  const {
    showDrinkCategoriesFilter,
  } = useContext(DrinkContext);

  useEffect(() => {
    console.log('hi');
  }, [showMealCategoriesFilter]);

  return (
    <div>
      <Header />
      <div>
        <h1>
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
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
