import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeInProgress from '../pages/RecipeInProgress';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />

        <Route
          path="/meals"
          component={ Recipes }
        />

        <Route
          path="/drinks"
          component={ Recipes }
        />

        <Route
          path="/meals/:id-da-receita"
          component={ RecipeDetails }
        />

        <Route
          path="/drinks/:id-da-receita"
          component={ RecipeDetails }
        />

        <Route
          path="/meals/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />

        <Route
          path="/drinks/:id-da-receita/in-progress"
          component={ RecipeInProgress }
        />

        <Route
          path="/profile"
          component={ Profile }
        />

        <Route
          path="/done-recipes"
          component={ DoneRecipes }
        />

        <Route
          path="/favorite-recipes"
          component={ FavoriteRecipes }
        />
      </Switch>
    </div>
  );
}
