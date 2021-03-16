import React from 'react';
import {render} from '@testing-library/react';
import ShowMoreButton from './show-more-button';

const countFilmsInList = 2;
const setCountFilmsInList = jest.fn();
it(`Should ShowMoreButton render correctly`, () => {
  const { container } = render(
      <ShowMoreButton
        countFilmsInList={countFilmsInList}
        setCountFilmsInList={setCountFilmsInList} />
  );
  expect(container).toMatchSnapshot();
});
