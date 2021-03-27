import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import MoviePage from './movie-page';
import {AuthorizationStatus} from '../../utils/const';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);
const onFollowingToPlayer = jest.fn();
const onFollowingToMyList = jest.fn();
const defaultProps = {
  match: {params: {id: `0`}},
};
it(`Should MoviePage render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH},
    FILM_DATA: {films: [{id: 0}, {id: 1}],
      selectedMovie: {
        "starring": [],
        "genre": `Test`,
        "id": 0,
      },
      isSelectedFilmLoaded: true,
      isFilmsLoaded: true,
    }
  });

  const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <MoviePage {...defaultProps} onFollowingToMyList={onFollowingToMyList} onFollowingToPlayer={onFollowingToPlayer}/>
        </Router>
      </redux.Provider>
  );
  expect(container).toMatchSnapshot();
});
