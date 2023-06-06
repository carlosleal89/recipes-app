import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TitleContext from '../context/TitleContext';

function Recipes() {
  const { setTitle } = useContext(TitleContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/meals') {
      setTitle('Meals');
    }
    if (location.pathname === '/drinks') {
      setTitle('Drinks');
    }
  }, [setTitle, location]);

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Recipes;
