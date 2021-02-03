import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const PromoMovie = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  released: 2014
};


ReactDOM.render(

    <App
      name={PromoMovie.name}
      genre={PromoMovie.genre}
      released={PromoMovie.released}
    ></App>,
    document.querySelector(`#root`)
);
