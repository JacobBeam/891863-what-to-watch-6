import React from 'react';
import PropTypes from 'prop-types';

const ShowMoreButton = (props) => {

  const {countFilmsInList, setCountFilmsInList} = props;

  const handleAddMoreFilms = () => {
    setCountFilmsInList(countFilmsInList + 8);
  };


  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button"
        onClick={handleAddMoreFilms}
      >Show more</button>
    </div>
  );
};

ShowMoreButton.propTypes = {
  countFilmsInList: PropTypes.number.isRequired,
  setCountFilmsInList: PropTypes.func.isRequired
};

export default ShowMoreButton;
