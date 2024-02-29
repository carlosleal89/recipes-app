import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';
import CardRecipes from '../components/CardRecipes';
import FilterButtons from '../components/FilterButtons';

function DoneRecipes() {
  const { setTitle } = useContext(TitleContext);
  const [doneRecipes, setDoneRecipes] = useState(() => {
    const localStorageData = localStorage.getItem('doneRecipes');
    return localStorage ? JSON.parse(localStorageData) : [];
  });

  useEffect(() => {
    setTitle('Done Recipes');
  }, [setTitle]);

  return (
    <div className="container__main-card-recipes">
      <Header />
      <FilterButtons
        setStateFunction={ setDoneRecipes }
        localStorageKey="doneRecipes"
      />
      <div data-testid="products-holder" className="container__recipe-card">
        {doneRecipes
        && doneRecipes.map((recipe, index) => (
          <CardRecipes
            key={ `${index}${Math.floor(Math.random() * 100)}` }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
