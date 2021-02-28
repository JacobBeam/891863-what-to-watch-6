import React, {useEffect} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
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
import {filmsPropTypes} from '../../utils/prop-types';
import {fetchFilmsList} from '../../store/api-action';

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
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage ></MainPage>
        </Route>
        <Route exact path="/login">
          <SignInPage></SignInPage>
        </Route>
        <Route exact path="/mylist">
          <MyListPage
            films={films}
          ></MyListPage>
        </Route>
        <Route exact path="/films/:id"
          render= {(prop)=> (
            <MoviePage
              films={films} {...prop}
            ></MoviePage>
          )}>
        </Route>
        <Route exact path="/films/:id/review"
          render= {(prop)=> (
            <AddReviewPage
              films={films} {...prop}
            ></AddReviewPage>
          )}>
        </Route>
        <Route exact path="/player/:id"
          render= {(prop)=> (
            <PlayerPage
              films={films} {...prop}
            ></PlayerPage>
          )}>
        </Route>
        <Route>
          <NotFoundPage></NotFoundPage>
        </Route>
      </Switch>
    </BrowserRouter>
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
