import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import CardFinishedRecipes from '../components/CardFinishedRecipes';

function DoneRecipes() {
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);

  // filtro de meals
  // filtro de drinks
  // remove filtros de meals e drinks e renderiza o localStorage completo

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        // onClick={ remove todos os filtros e renderiza tudo que está no localStorage  }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        // onClick={ .filter no local storage para que seja trazido todos os meals armazenados no local storage }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        // onClick={ .filter no local storage para que seja trazido todos os drinks armazenados no local storage }
      >
        Drinks
      </button>
      <CardFinishedRecipes />
    </div>
  );
}

export default DoneRecipes;
