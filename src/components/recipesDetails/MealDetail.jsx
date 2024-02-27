import PropTypes from 'prop-types';
import React from 'react';
import Recommendation from './Recommendation';
import YoutubePlayer from './YoutubePlayer';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import PhotoAndTitle from './PhotoAndTitle';
import ButtonStartContinue from './ButtonStartContinue';
import '../../css/themes/light.css';
import '../../css/themes/dark.css';

function MealDetail({ meal, recommendation }) {
  return (
    <div>
      <PhotoAndTitle recipe={ meal } />

      <Ingredients recipe={ meal } />

      <Instructions recipe={ meal } />

      <YoutubePlayer youtubeLink={ meal[0].strYoutube } />

      <Recommendation recommendation={ recommendation } />

      <ButtonStartContinue recipe={ meal } />

    </div>
  );
}

MealDetail.propTypes = {
  meal: PropTypes.instanceOf(Object).isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default MealDetail;
