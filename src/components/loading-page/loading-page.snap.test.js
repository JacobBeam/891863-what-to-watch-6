import React from 'react';
import {render} from '@testing-library/react';
import LoadingPage from './loading-page';


it(`Should Mistakes render correctly`, () => {
  const {container} = render(<LoadingPage/>);
  expect(container).toMatchSnapshot();
});
