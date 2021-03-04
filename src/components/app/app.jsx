import React, {useEffect} from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyListPage from '../my-list-page/my-list-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PlayerPage from '../player-page/player-page';
import SignInPage from '../sign-in-page/sign-in-page';
import AddReviewPage from '../add-review-page/add-review-page';
import LoadingPage from '../loading-page/loading-page';
import PrivateRoute from '../private-route/private-route';
import {filmsPropTypes} from '../../utils/prop-types';
import {fetchFilmsList} from '../../store/api-action';
import browserHistory from '../../services/browser-history';

const App = (props)=>{

  const {films, isFilmsLoaded, onLoadData} = props;

  useEffect(() => {
    if (!isFilmsLoaded) {
      onLoadData();
    }
  }, [isFilmsLoaded]);

  if (!isFilmsLoaded) {
    return (
      <LoadingPage></LoadingPage>
    );
  }

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route
          exact
          path="/"
          render={({history})=>{
            return <MainPage
              onFollowingToMyList={() => history.push(`/mylist`)}
              onFollowingToPlayer={() => history.push(`/player/${films[0].id}`)}
            />;
          }}
        >
        </Route>
        <Route exact path="/login">
          <SignInPage></SignInPage>
        </Route>
        <PrivateRoute exact
          path="/mylist"
          render={()=>(<MyListPage
            films={films}
          ></MyListPage>)}
        ></PrivateRoute>
        <Route exact path="/films/:id"
          render= {(prop)=> (
            <MoviePage
              {...prop}
              onFollowingToPlayer= {(film) => prop.history.push(`/player/${film}`)}
              onFollowingToMyList={() => prop.history.push(`/mylist`)}
            ></MoviePage>
          )}>
        </Route>
        <PrivateRoute exact path="/films/:id/review"
          render= {(prop)=> (
            <AddReviewPage
              {...prop}
            ></AddReviewPage>
          )}>
        </PrivateRoute>
        <Route exact path="/player/:id"
          render= {(prop)=> (
            <PlayerPage
              films={films}
              {...prop}
              onFollowingGoBack={() => prop.history.goBack()}
            ></PlayerPage>
          )}>
        </Route>
        <Route>
          <NotFoundPage></NotFoundPage>
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  ...filmsPropTypes,
  isFilmsLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isFilmsLoaded: state.isFilmsLoaded,
  films: state.films
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchFilmsList());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
