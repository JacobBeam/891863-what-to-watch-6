import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Router} from 'react-router-dom';
import TabReviews from './tab-reviews';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);


it(`Should TabReviews render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    COMMENT_DATA: {
      isSentComment: false,
      selectedComments: []
    }
  });

  const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <TabReviews/>
        </Router>
      </redux.Provider>
  );
  expect(container).toMatchSnapshot();
});
