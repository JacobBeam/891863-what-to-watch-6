import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import MoviePage from '../movie-page/movie-page';
import MyListPage from '../my-list-page/my-list-page';
import NotFoundPage from '../not-found-page/not-found-page';
import PlayerPage from '../player-page/player-page';
import SignInPage from '../sign-in-page/sign-in-page';
import AddReviewPage from '../add-review-page/add-review-page';
import PrivateRoute from '../private-route/private-route';

const App = ()=>{

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(prop)=>{
          return <MainPage
            {...prop}
            onFollowingToMyList={() => prop.history.push(`/mylist`)}
            onFollowingToPlayer={(promo) => prop.history.push(`/player/${promo.id}`)}
          />;
        }}
      >
      </Route>
      <Route exact path="/login">
        <SignInPage></SignInPage>
      </Route>
      <PrivateRoute exact
        path="/mylist"
        render={()=>(<MyListPage></MyListPage>)}
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
            {...prop}
            onFollowingGoBack={() => prop.history.goBack()}
          ></PlayerPage>
        )}>
      </Route>
      <Route>
        <NotFoundPage></NotFoundPage>
      </Route>
    </Switch>
  );
};

export default App;
