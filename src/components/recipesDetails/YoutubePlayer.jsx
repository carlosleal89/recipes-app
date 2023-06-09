import PropTypes from 'prop-types';
import React from 'react';

function YoutubePlayer({ youtubeLink }) {
  return (
    <div className="container__youtube">
      <iframe
        width="560"
        height="315"
        data-testid="video"
        src={ youtubeLink.replace('watch?v=', 'embed/') }
        title="YouTube video player"
        allow="accelerometer;
                autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

YoutubePlayer.propTypes = {
  youtubeLink: PropTypes.string.isRequired,
};

export default YoutubePlayer;
