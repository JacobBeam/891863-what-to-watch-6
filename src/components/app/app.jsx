import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyListPage from '../my-list-page/my-list-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PlayerPage from '../player-page/player-page';
import SignInPage from '../sign-in-page/sign-in-page';
import AddReviewPage from '../add-review-page/add-review-page';


const App = (props)=>{

  const {name, genre, released} = props;

  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage
            name={name}
            genre={genre}
            released={released}
          ></MainPage>
        </Route>
        <Route exact path="/login">
          <SignInPage></SignInPage>
        </Route>
        <Route exact path="/mylist">
          <MyListPage></MyListPage>
        </Route>
        <Route exact path="/films/:id">
          <MoviePage></MoviePage>
        </Route>
        <Route exact path="/films/:id/review">
          <AddReviewPage></AddReviewPage>
        </Route>
        <Route exact path="/player/:id">
          <PlayerPage></PlayerPage>
        </Route>
        <Route>
          <NotFoundPage></NotFoundPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
};

export default App;
