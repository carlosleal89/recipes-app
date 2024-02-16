import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ThemeContext from './ThemeContext';
import '../css/themes/light.css';
import '../css/themes/dark.css';

export default function ThemeProvider({ children }) {
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'dark');

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const values = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={ values }>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
