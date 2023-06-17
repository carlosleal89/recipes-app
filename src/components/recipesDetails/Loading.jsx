import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import '../../css/Loading.css';

function Loading() {
  return (
    <div className="container-loading">
      <BeatLoader
        size={ 25 }
        color="#fcdc36"
        speedMultiplier={ 1.5 }
      />
    </div>
  );
}

export default Loading;
