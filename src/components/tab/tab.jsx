import React from 'react';
import PropTypes from 'prop-types';

const Tab = (props) => {

  const {name, activeTab, setActiveTab} = props;


  return (

    <li
      onClick = {(evt)=> {
        evt.preventDefault();
        setActiveTab(name);
      }
      }
      className={`movie-nav__item ${activeTab === name ? `movie-nav__item--active` : `` }`}>
      <a href="#" className="movie-nav__link">{name}</a>
    </li>
  );
};

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Tab;
