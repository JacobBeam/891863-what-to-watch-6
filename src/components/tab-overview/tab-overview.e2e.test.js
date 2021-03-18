import React from 'react';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import TabOverview from './tab-overview';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);


it(`Should TabOverview render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    FILM_DATA: {
      films: [{}],
      selectedMovie: {
        "starring": [],
      }
    }
  });

  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <TabOverview/>
        </Router>
      </redux.Provider>
  );
  expect(screen.getByText(/ratings/i)).toBeInTheDocument();
});
