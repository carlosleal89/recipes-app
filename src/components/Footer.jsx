import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidDrink } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import { useWithSound } from '../hooks/useWithSound';
import click from '../audio/click.mp3';
import '../css/Footer.css';

function Footer() {
  const { playSound } = useWithSound(click);

  return (
    <footer data-testid="footer" className="footer">
      <div className="footer-bar">
        <div className="container-icons">
          <Link to="/drinks">
            <BiSolidDrink className="icon-footer" onClick={ () => playSound() } />
          </Link>
        </div>
        <div className="container-icons">
          <Link to="/meals">
            <GiMeal className="icon-footer" onClick={ () => playSound() } />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
