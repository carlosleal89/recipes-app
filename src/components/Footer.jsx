import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ { position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px' } }
    >
      <Link
        to="/drinks"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drinks"
          style={ { width: '30px',
            height: '30px' } }
        />
      </Link>
      <Link
        to="/meals"
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Meals"
          style={ { width: '30px',
            height: '30px' } }
        />
      </Link>
    </footer>
  );
}

export default Footer;
