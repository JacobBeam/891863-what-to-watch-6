import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import films from './mocks/films';


ReactDOM.render(

    <App
      films={films}
    ></App>,
    document.querySelector(`#root`)
);
