import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './components/app/app';
import rootReducer from './store/root-reducer';
import {createAPI} from './services/api';
import {checkAuth} from './store/api-action';
import {redirect} from "./store/middlewares/redirect";
import {ActionCreator} from './store/action';
import {Router} from 'react-router-dom';
import browserHistory from '../../services/browser-history';

const api = createAPI(() => store.dispatch(ActionCreator.redirectToRoute(`/not-found`)));

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

store.dispatch(checkAuth());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App></App>
    </Router>
  </Provider>,
  document.querySelector(`#root`)
);
