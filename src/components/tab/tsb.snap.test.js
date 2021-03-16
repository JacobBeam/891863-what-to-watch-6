import React from 'react';
import {render} from '@testing-library/react';
import Tab from './tab';

const name = `Test`
const activeTab = `Test`;
const setActiveTab = jest.fn();
it(`Should Tab render correctly`, () => {
  const { container } = render(

    <Tab
      name={name}
      activeTab={activeTab}
      setActiveTab={setActiveTab} />
  );
  expect(container).toMatchSnapshot();
});
