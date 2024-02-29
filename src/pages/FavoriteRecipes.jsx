import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import TitleContext from '../context/TitleContext';
import CardRecipes from '../components/CardRecipes';

function FavoriteRecipes() {
  const { setTitle } = useContext(TitleContext);
  const [products, setProducts] = useState(() => {
    const localStorageData = localStorage.getItem('favoriteRecipes');
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);

  return (
    <div className="container__main-card-recipes">
      <Header />
      <FilterButtons
        setStateFunction={ setProducts }
        localStorageKey="favoriteRecipes"
      />
      <div data-testid="products-holder" className="container__recipe-card">
        {
          products.map((element, index) => (
            <CardRecipes
              key={ `${index}${Math.floor(Math.random() * 100)}` }
              recipe={ element }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
