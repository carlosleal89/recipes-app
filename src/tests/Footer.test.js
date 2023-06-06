import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Testa o componente Footer', () => {
  it('renderização do footer corretamente', () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('renderiza os drinks com a imagem correta', () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );

    const drinksLink = screen.getByTestId('drinks-bottom-btn');
    expect(drinksLink).toBeInTheDocument();

    const drinksIcon = screen.getByAltText('Drinks');
    expect(drinksIcon).toBeInTheDocument();
    expect(drinksIcon.getAttribute('src')).toContain('drinkIcon.svg');
  });

  it('renderiza as refeições com a imagem correta', () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );

    const mealsLink = screen.getByTestId('meals-bottom-btn');
    expect(mealsLink).toBeInTheDocument();

    const mealsIcon = screen.getByAltText('Meals');
    expect(mealsIcon).toBeInTheDocument();
    expect(mealsIcon.getAttribute('src')).toContain('mealIcon.svg');
  });
});
