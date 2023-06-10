import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import mealById from '../mocks/mealsById';
import drinkById from '../mocks/drinkById';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste da página de detalhes da receita começando na rota /meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealById),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza os detalhes da receita corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const img = screen.getByRole('img', { name: /corba/i });
    expect(img).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: /corba/i });
    expect(title).toBeInTheDocument();

    const ingredients = screen.getByRole('heading', { name: /ingredients/i });
    expect(ingredients).toBeInTheDocument();

    const instructions = screen.getByRole('heading', { name: /instructions/i });
    expect(instructions).toBeInTheDocument();

    const recommended = screen.getByRole('heading', { name: /recommended/i });
    expect(recommended).toBeInTheDocument();

    const imgRecommended = screen.getByRole('img', { name: /gg/i });
    expect(imgRecommended).toBeInTheDocument();
  });
});

describe('Teste da página de detalhes da receita começando na rota /drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkById),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza os detalhes da receita corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });

    await waitFor(() => {
      const loading = screen.queryByText(/loading.../i);
      expect(loading).not.toBeInTheDocument();
    });

    const img = screen.getByRole('img', { name: /gg/i });
    expect(img).toBeInTheDocument();

    const title = screen.getByRole('heading', { name: /gg/i });
    expect(title).toBeInTheDocument();

    const ingredients = screen.getByRole('heading', { name: /ingredients/i });
    expect(ingredients).toBeInTheDocument();

    const instructions = screen.getByRole('heading', { name: /instructions/i });
    expect(instructions).toBeInTheDocument();

    const recommended = screen.getByRole('heading', { name: /recommended/i });
    expect(recommended).toBeInTheDocument();

    const imgRecommended = screen.getByRole('img', { name: /corba/i });
    expect(imgRecommended).toBeInTheDocument();
  });
});
