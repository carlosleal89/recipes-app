import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste do Header na rota /meals', () => {
  beforeEach(() => {
    const userInfo = JSON.stringify({ email: 'main-group7@trybe.com' });
    localStorage.setItem('user', userInfo);
  });

  it('Verifica se possui o título Meals', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const titleMeals = screen.getByText(/meals/i);
    expect(titleMeals).toBeInTheDocument();
  });

  it('Verifica se possui os ícones de perfil e pesquisa', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const iconSearch = screen.getByRole('img', { name: /searchicon/i });
    expect(iconSearch).toBeInTheDocument();

    const iconProfile = screen.getByRole('img', { name: /profileicon/i });
    expect(iconProfile).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de perfil é redirecionado a rota /profile', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const iconProfile = screen.getByRole('img', { name: /profileicon/i });
    expect(iconProfile).toBeInTheDocument();

    fireEvent.click(iconProfile);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica se ao clicar no botão de pesquisa, o input é mostrado', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const iconSearch = screen.getByRole('img', { name: /searchicon/i });

    fireEvent.click(iconSearch);

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });
});

describe('Teste do Header na rota /drinks', () => {
  it('Verifica se possui o título Drinks', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const titleDrinks = screen.getByText(/drinks/i);
    expect(titleDrinks).toBeInTheDocument();
  });

  it('Verifica se possui os ícones de perfil e pesquisa', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const iconSearch = screen.getByRole('img', { name: /searchicon/i });
    expect(iconSearch).toBeInTheDocument();

    const iconProfile = screen.getByRole('img', { name: /profileicon/i });
    expect(iconProfile).toBeInTheDocument();
  });
});

describe('Teste do Header na rota /profile', () => {
  it('Verifica se possui o título Profile', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const titleProfile = screen.getByRole('heading', { name: /profile/i });
    expect(titleProfile).toBeInTheDocument();
  });

  it('Verifica se possui o botão de perfil', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const iconProfile = screen.getByRole('img', { name: /profileicon/i });
    expect(iconProfile).toBeInTheDocument();
  });
});

describe('Teste do Header na rota /done-recipes', () => {
  it('Verifica se possui o título Done Recipes', () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    const titleDoneRecipes = screen.getByText(/done recipes/i);
    expect(titleDoneRecipes).toBeInTheDocument();
  });

  it('Verifica se possui o ícone de perfil', () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    const iconProfile = screen.getByRole('img', { name: /profileicon/i });
    expect(iconProfile).toBeInTheDocument();
  });
});

describe('Teste do Header na rota /favorite-recipes', () => {
  it('Verifica se possui o título Favorite Recipes', () => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });

    const titleFavoriteRecipes = screen.getByText(/favorite recipes/i);
    expect(titleFavoriteRecipes).toBeInTheDocument();
  });

  it('Verifica se possui o ícone de perfil', () => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });

    const iconProfile = screen.getByRole('img', { name: /profileicon/i });
    expect(iconProfile).toBeInTheDocument();
  });
});
