import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import TitleContext from './TitleContext';

function TitleProvider({ children }) {
  const [title, setTitle] = useState('');

  const values = useMemo(() => ({
    title,
    setTitle,
  }), [title, setTitle]);

  return (
    <TitleContext.Provider value={ values }>
      { children }
    </TitleContext.Provider>
  );
}

TitleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleProvider;
