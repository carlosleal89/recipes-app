import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import mealCategories from '../../cypress/mocks/mealCategories';
import mealIngredients from '../mocks/mealIngredients';
import meals from '../../cypress/mocks/meals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import SearchBar from '../components/SearchBar';

describe.only('Teste do SearchBar na rota /meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      // .mockResolvedValueOnce({
      //   json: jest.fn().mockResolvedValue(meals),
      // })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealIngredients),
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza as refeições de acordo com o filtro', async () => {
    const { debug } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const mealCard = screen.getByTestId('0-recipe-card');
      expect(mealCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /ingredient/i });
    const buttonSeach = screen.getByTestId('exec-search-btn');

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'chicken' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    // console.log(debug());

    screen.getByText(/brown stew chicken/i);
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
  });
});
