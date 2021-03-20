import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundPage from './not-found-page';


it(`Should NotFoundPage render correctly`, () => {
  const history = createMemoryHistory();

  const {container} = render(
      <Router history={history}>
        <NotFoundPage/>
      </Router>);
  expect(container).toMatchSnapshot();
});
