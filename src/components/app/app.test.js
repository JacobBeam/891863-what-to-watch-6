import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../utils/const';
import App from './app';

const mockStore = configureStore({});

describe(`Test routing`, () => {

jest.spyOn(redux, `mapStateToProps`);
const mapStateToProps=jest.fn()
  //jest.spyOn(redux, `useDispatch`);
  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();



    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/my list/i).toBeInTheDocument());
  });
});
