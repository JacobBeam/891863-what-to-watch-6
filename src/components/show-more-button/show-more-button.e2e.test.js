import React from 'react';
import {render, screen} from '@testing-library/react';
import ShowMoreButton from './show-more-button';

const countFilmsInList = 2;
const setCountFilmsInList = jest.fn();
it(`Should ShowMoreButton render correctly`, () => {
 render(
      <ShowMoreButton
        countFilmsInList={countFilmsInList}
        setCountFilmsInList={setCountFilmsInList} />
  );
  expect(screen.getByText(/Show more/i)).toBeInTheDocument();
});
