import React, { useContext } from 'react';
import { IoSunny } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';
import ThemeContext from '../context/ThemeContext';
import '../css/ThemeToggler.css';

export default function ThemeToggler() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <button onClick={ toggleTheme } className="btn-toggle-theme">
      {theme === 'light'
        ? <FaMoon className="moon" size={ 35 } />
        : <IoSunny className="sun" size={ 35 } />}
    </button>
  );
}
