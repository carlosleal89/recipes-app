import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';

function DoneRecipes() {
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default DoneRecipes;
