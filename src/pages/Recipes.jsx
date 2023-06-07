import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <div>
        <h1>
          {
            location.pathname === '/meals'
            && <Meals />
          }
          {
            location.pathname === '/drinks'
            && <Drinks />
          }
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
