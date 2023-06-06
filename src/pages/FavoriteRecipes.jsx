import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';

function FavoriteRecipes() {
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Favorite Recipes');
  }, [setTitle]);

  return (
    <div>
      <Header />
      <h1>FavoriteRecipes</h1>
    </div>
  );
}

export default FavoriteRecipes;
