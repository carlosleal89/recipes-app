import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import TitleContext from '../context/TitleContext';

function Profile() {
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle('Profile');
  }, [setTitle]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Profile;
