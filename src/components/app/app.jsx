import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page';


const App = (props)=>{

  const {name, genre, released} = props;

  return (
    <MainPage
      name={name}
      genre={genre}
      released={released}
    ></MainPage>
  );
};

App.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
};

export default App;
