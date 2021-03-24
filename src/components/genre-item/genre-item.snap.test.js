import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import GenreItem from './genre-item';
import {allGenreFilter} from '../../utils/const';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);
const name = allGenreFilter.ALL_GENRES;
const onResetCountFilms = jest.fn();

it(`Should GenreItem render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    FILM_DATA: {genre: `Test`},
  });

  const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <GenreItem name={name} onResetCountFilms={onResetCountFilms}/>
        </Router>
      </redux.Provider>
  );
  expect(container).toMatchSnapshot();
});
