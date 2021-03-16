import React from 'react';
import {render, screen} from '@testing-library/react';
import RatingItem from './rating-item';

const id =1
const onChangeInput = jest.fn();
const isSentComment = true;
it(`Should RatingItem render correctly`, () => {
render(
    <RatingItem
      id={id}
      onChangeInput={onChangeInput}
      isSentComment={isSentComment} />
  );
  expect(screen.getByText(`Rating ${id}`)).toBeInTheDocument();
});
