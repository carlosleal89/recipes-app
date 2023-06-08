import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import beefMeals from '../../cypress/mocks/beefMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste da página de receitas na rota /meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(beefMeals),
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza as refeições de acordo com o filtro', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const mealCard = screen.getByTestId('0-recipe-card');
      expect(mealCard).toBeInTheDocument();
    });

    const buttonFilter = screen.getByRole('button', { name: /beef/i });
    expect(buttonFilter).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonFilter);
    });

    await waitFor(() => {
      const mealCardFiltred = screen.getByText(/beef and mustard pie/i);
      expect(mealCardFiltred).toBeInTheDocument();
    });
  });
});

describe('Teste da página de receitas na rota /drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(ordinaryDrinks),
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza as bebidas de acordo com o filtro', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const drinkCard = screen.getByTestId('0-recipe-card');
      expect(drinkCard).toBeInTheDocument();
    });

    const buttonFilter = screen.getByRole('button', { name: /ordinary drink/i });
    expect(buttonFilter).toBeInTheDocument();

    act(() => {
      fireEvent.click(buttonFilter);
    });

    await waitFor(() => {
      const drinkCardFiltred = screen.getByText(/3-mile long island iced tea/i);
      expect(drinkCardFiltred).toBeInTheDocument();
    });
  });
});
