import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa a tela de login.', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';

  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se os elementos de titulo, inputs e button aparecem na tela.', () => {
    const mainTitle = screen.getByRole('heading', { name: /recipes/i });
    const subTitle = screen.getByRole('heading', { name: /login/i });
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEl = screen.getByRole('button');

    expect(mainTitle).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnEl).toBeInTheDocument();
  });

  it('Testa se a validação de email e password estão corretas', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const btnEl = screen.getByRole('button');
    const correctEmail = 'main-group7@email.com';
    const correctPassword = '1234567';
    const incorrectEmail = 'main-group7.com';

    expect(btnEl).toBeDisabled();

    userEvent.type(emailInput, incorrectEmail);
    userEvent.type(passwordInput, correctPassword);
    expect(btnEl).toBeDisabled();

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    expect(btnEl).toBeEnabled();
  });

  it('Testa se ao clicar no botão o email é salvo no localstorage e redireciona para a rota /meals', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const correctEmail = 'main-group7@email.com';
    const correctPassword = '1234567';
    const btnEl = screen.getByRole('button');

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);

    userEvent.click(btnEl);

    const email = JSON.stringify({ email: correctEmail });
    localStorage.setItem('user', email);

    const userInfo = localStorage.getItem('user');
    expect(email).toEqual(userInfo);
  });
});
