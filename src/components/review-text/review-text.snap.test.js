import React from 'react';
import {render} from '@testing-library/react';
import ReviewText from './review-text';

const onChangeInput = jest.fn();
const isSentComment = true;
it(`Should ReviewText render correctly`, () => {
  const { container } = render(
      <ReviewText
        onChangeInput={onChangeInput}
        isSentComment={isSentComment} />
);
  expect(container).toMatchSnapshot();
});
