import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import MealsCategories from '../components/MealsCategories';
import DrinksCategories from '../components/DrinksCategories';

function Recipes() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <div>
        <h1>
          {
            location.pathname === '/meals'
            && (
              <div>
                <MealsCategories />
                <Meals />
              </div>
            )
          }
          {
            location.pathname === '/drinks'
            && (
              <div>
                <DrinksCategories />
                <Drinks />
              </div>
            )
          }
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
