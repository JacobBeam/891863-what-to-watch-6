import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import GenreList from './genres-list';


const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);
const setStartCountFilmsInList = jest.fn();

it(`Should GenreList render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    FILM_DATA: {films: [],
      genre: `Test`},
  });

  const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <GenreList setStartCountFilmsInList={setStartCountFilmsInList}/>
        </Router>
      </redux.Provider>
  );
  expect(container).toMatchSnapshot();
});
