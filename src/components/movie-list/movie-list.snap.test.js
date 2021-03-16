import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MovieList from './movie-list';

const films = [{id:0},{id:1}]
const countFilmsInList = 2
it(`Should MovieList render correctly`, () => {
  const history = createMemoryHistory();

  const { container } = render(
    <Router history={history}>
      <MovieList
        films={films}
        countFilmsInList={countFilmsInList}
      /></Router>
  )
  expect(container).toMatchSnapshot();
});
