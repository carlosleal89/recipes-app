import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa a tela de login.', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const profileBtnTestId = 'profile-top-btn';
  const correctEmail = 'main-group7@email.com';
  const correctPassword = '1234567';
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se os componentes da tela de profile são renderizados.', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEl = screen.getByRole('button');

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    userEvent.click(btnEl);

    const profileBtnEl = screen.getByTestId(profileBtnTestId);
    userEvent.click(profileBtnEl);

    const titleEl = screen.getByRole('heading', { name: /profile/i });
    const userEmailEl = screen.getByTestId('profile-email');
    const doneRecipesBtnEl = screen.getByTestId('profile-done-btn');
    const favoriteRecipesBtnEl = screen.getByTestId('profile-favorite-btn');
    const logoutBtnEl = screen.getByTestId('profile-logout-btn');
    expect(titleEl).toBeInTheDocument();
    expect(userEmailEl).toBeInTheDocument();
    expect(doneRecipesBtnEl).toBeInTheDocument();
    expect(favoriteRecipesBtnEl).toBeInTheDocument();
    expect(logoutBtnEl).toBeInTheDocument();
  });

  it('Testa se os botão Done Recipes redireciona para a rota correta.', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEl = screen.getByRole('button');

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    userEvent.click(btnEl);

    const profileBtnEl = screen.getByTestId(profileBtnTestId);
    userEvent.click(profileBtnEl);

    const doneRecipesBtnEl = screen.getByTestId('profile-done-btn');

    userEvent.click(doneRecipesBtnEl);

    const doneRecipesTileEl = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneRecipesTileEl).toBeInTheDocument();
  });

  it('Testa se o botão de Favorites recipes redireciona para a rota correta.', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEl = screen.getByRole('button');

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    userEvent.click(btnEl);

    const profileBtnEl = screen.getByTestId(profileBtnTestId);
    userEvent.click(profileBtnEl);

    const favoriteRecipesBtnEl = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteRecipesBtnEl);

    const favoritesRecipesTileEl = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(favoritesRecipesTileEl).toBeInTheDocument();
  });

  it('Testa se o botão de logout recipes redireciona para a rota correta.', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEl = screen.getByRole('button');

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    userEvent.click(btnEl);

    const profileBtnEl = screen.getByTestId(profileBtnTestId);
    userEvent.click(profileBtnEl);

    const logoutBtnEl = screen.getByTestId('profile-logout-btn');

    userEvent.click(logoutBtnEl);

    const subTitleEl = screen.getByRole('heading', { name: /login/i });
    expect(subTitleEl).toBeInTheDocument();
  });
});
