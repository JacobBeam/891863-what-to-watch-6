import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyListPage from '../my-list-page/my-list-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PlayerPage from '../player-page/player-page';
import SignInPage from '../sign-in-page/sign-in-page';
import AddReviewPage from '../add-review-page/add-review-page';
import {filmsPropTypes} from '../../utils/prop-types';


const App = (props)=>{

  const {films} = props;

  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage
            films={films}
          ></MainPage>
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

App.propTypes = filmsPropTypes;

export default App;
