import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../utils/const';
import App from './app';

const mockStore = configureStore({});
const films = [{},{}]
const isFilmsLoaded = true
const onLoadData = jest.fn()

describe(`Test routing`, () => {

  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      films: [{},{}],
      isFilmsLoaded: false,
      selectedMovie: {},
      isSelectedFilmLoaded: false,
      genre: `All genres`,
      promo: {},
      isPromoLoaded: false,
      favoritesFilms: [],
      isFavoritesFilmsLoaded: false,
    })




    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App films={films} isFilmsLoaded={isFilmsLoaded} onLoadData={onLoadData} />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(new RegExp(`my list`, `i`))).toBeInTheDocument();
  });
});
