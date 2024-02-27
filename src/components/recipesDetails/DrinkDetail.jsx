import PropTypes from 'prop-types';
import Recommendation from './Recommendation';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import PhotoAndTitle from './PhotoAndTitle';
import ButtonStartContinue from './ButtonStartContinue';

function DrinkDetail({ drink, recommendation }) {
  return (
    <div>
      <PhotoAndTitle recipe={ drink } />

      <Ingredients recipe={ drink } />

      <Instructions recipe={ drink } />

      <Recommendation recommendation={ recommendation } />

      <ButtonStartContinue recipe={ drink } />
    </div>
  );
}

DrinkDetail.propTypes = {
  drink: PropTypes.instanceOf(Object).isRequired,
  recommendation: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default DrinkDetail;
