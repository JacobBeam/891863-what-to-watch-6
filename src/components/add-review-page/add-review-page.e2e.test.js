import React from 'react';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../utils/const';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import AddReviewPage from './add-review-page';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);

it(`Should AddReviewPage render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH},
    FILM_DATA: {
      selectedMovie: {
        "id": 0,
      },
      isSelectedFilmLoaded: true,
    },
    COMMENT_DATA: {
      isSentComment: false,
      selectedComments: []
    }
  });
  const defaultProps = {
    match: {params: {id: `0`}},
  };

  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <AddReviewPage {...defaultProps}/>
        </Router>
      </redux.Provider>
  );
  expect(screen.getByText(/Add review/i)).toBeInTheDocument();
});
