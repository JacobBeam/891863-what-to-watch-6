import React from 'react';
import {render} from '@testing-library/react';
import RatingStars from './rating-stars';

const onChangeInput = jest.fn();
const isSentComment = true;
it(`Should RatingStars render correctly`, () => {
  const { container } = render(
      <RatingStars
        onChangeInput={onChangeInput}
        isSentComment={isSentComment} />
 );
  expect(container).toMatchSnapshot();
});
