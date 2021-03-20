import React from 'react';
import {render} from '@testing-library/react';
import Comment from './comment';

const comment = {
  "id": 1,
  "user": {
    "id": 4,
    "name": `Test`
  },
  "rating": 0,
  "comment": `Test Test Test Test Test Test Test Test`,
  "date": `2019-05-08T14:13:56.569Z`
};

it(`Should Comment render correctly`, () => {
  const {container} = render(<Comment comment={comment}/>);
  expect(container).toMatchSnapshot();
});
