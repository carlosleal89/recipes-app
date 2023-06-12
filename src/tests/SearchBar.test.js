import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import mealCategories from '../../cypress/mocks/mealCategories';
import mealIngredients from '../mocks/mealIngredients';
import mealName from '../mocks/mealName';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import mealFirstLetter from '../mocks/mealFirsLetter';
import drinkIngredients from '../mocks/drinkIngredients';
import drinkName from '../mocks/drinkName';
import drinkFirstLetter from '../mocks/drinkFirstLetter';

describe('Teste do SearchBar na rota /meals', () => {
  const RECIPE_CARD = '0-recipe-card';
  const SEARCH_BTN = 'exec-search-btn';
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza as refeições por ingrediente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealIngredients),
      });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const mealCard = screen.getByTestId(RECIPE_CARD);
      expect(mealCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /ingredient/i });
    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'chicken' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    screen.getByText(/brown stew chicken/i);

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('Verifica se renderiza as refeições por nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealName),
      });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const mealCard = screen.getByTestId(RECIPE_CARD);
      expect(mealCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /name/i });
    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'soup' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    screen.getByText(/leblebi soup/i);

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('Verifica se aparece o alert se colocar um nome inválido', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealName),
      });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const mealCard = screen.getByTestId(RECIPE_CARD);
      expect(mealCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /name/i });
    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'soup' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    screen.getByText(/leblebi soup/i);

    fireEvent.change(inputSearch, { target: { value: 'test' } });

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('Verifica se filtar por first letter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealFirstLetter),
      });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const mealCard = screen.getByTestId(RECIPE_CARD);
      expect(mealCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /first letter/i });
    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'c' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    screen.getByText(/chocolate gateau/i);

    fireEvent.change(inputSearch, { target: { value: 'test' } });

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('Verifica se aparece o alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      const mealCard = screen.getByTestId(RECIPE_CARD);
      expect(mealCard).toBeInTheDocument();
    });

    const buttonSearch1 = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch1);
    });

    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
});

describe('Teste do SearchBar na rota /drinks', () => {
  const RECIPE_CARD = '0-recipe-card';
  const SEARCH_BTN = 'exec-search-btn';
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se renderiza as refeições por ingrediente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkIngredients),
      });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const drinkCard = screen.getByTestId(RECIPE_CARD);
      expect(drinkCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /ingredient/i });
    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'lemon' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    screen.getByText(/a true amaretto sour/i);

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('Verifica se renderiza as refeições por nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkName),
      });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const drinkCard = screen.getByTestId(RECIPE_CARD);
      expect(drinkCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /name/i });
    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'gin' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    screen.getByText(/gin fizz/i);

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('Verifica se aparece o alert se colocar um nome inválido', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkName),
      });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const drinkCard = screen.getByTestId(RECIPE_CARD);
      expect(drinkCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /name/i });
    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'gin' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    screen.getByText(/gin fizz/i);

    fireEvent.change(inputSearch, { target: { value: 'test' } });

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('Verifica se filtar por first letter', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkCategories),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinkFirstLetter),
      });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const drinkCard = screen.getByTestId(RECIPE_CARD);
      expect(drinkCard).toBeInTheDocument();
    });

    const buttonSearch = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch);
    });

    const inputSearch = screen.getByPlaceholderText(/search/i);
    const selectedRadio = screen.getByRole('radio', { name: /first letter/i });
    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.change(inputSearch, { target: { value: 'c' } });
      fireEvent.click(selectedRadio);
      fireEvent.click(buttonSeach);
    });

    screen.getByText(/casino/i);

    fireEvent.change(inputSearch, { target: { value: 'test' } });

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('Verifica se aparece o alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      const drinkCard = screen.getByTestId(RECIPE_CARD);
      expect(drinkCard).toBeInTheDocument();
    });

    const buttonSearch1 = screen.getByRole('img', { name: /searchicon/i });

    act(() => {
      fireEvent.click(buttonSearch1);
    });

    const buttonSeach = screen.getByTestId(SEARCH_BTN);

    act(() => {
      fireEvent.click(buttonSeach);
    });

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
