import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <div className="footer-bar">
        <div className="footer-icons">
          <Link to="/drinks">
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="Drinks"
            />
          </Link>
        </div>
        <div className="footer-icons">
          <Link to="/meals">
            <img
              data-testid="meals-bottom-btn"
              src={ mealIcon }
              alt="Meals"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
