import PropTypes from 'prop-types';
import React from 'react';

function YoutubePlayer({ youtubeId }) {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        data-testid="video"
        src={ `https://www.youtube.com/embed/${youtubeId}` }
        title="YouTube video player"
        allow="accelerometer;
                autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

YoutubePlayer.propTypes = {
  youtubeId: PropTypes.string.isRequired,
};

export default YoutubePlayer;
