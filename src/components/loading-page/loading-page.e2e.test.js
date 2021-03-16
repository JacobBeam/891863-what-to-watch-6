import React from 'react';
import {render, screen} from '@testing-library/react';
import LoadingPage from './loading-page';

it(`LoadingPage should render correctly`, () => {

 render (<LoadingPage />);

  expect(screen.getByText(/Wait, please. Loading.../i)).toBeInTheDocument();
});
