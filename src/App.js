import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Routes from './routes/Routes';
import TitleProvider from './context/TitleProvider';
import MealsProvider from './context/MealsProvider';
import DrinksProvider from './context/DrinksProvider';
import ThemeProvider from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <TitleProvider>
        <MealsProvider>
          <DrinksProvider>
            <Routes />
          </DrinksProvider>
        </MealsProvider>
      </TitleProvider>
    </ThemeProvider>
  );
}

export default App;
