import React from 'react';
import {render} from '@testing-library/react';

import RatingItem from './rating-item';

const id =1
const onChangeInput = jest.fn();
const isSentComment = true;
it(`Should RatingItem render correctly`, () => {
  const { container } = render(
    <RatingItem
      id={id}
      onChangeInput={onChangeInput}
      isSentComment={isSentComment} />
  );
  expect(container).toMatchSnapshot();
});
