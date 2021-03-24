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
import {AppRoute} from '../../utils/const';

const App = ()=>{

  return (
    <Switch>
      <Route
        exact
        path={AppRoute.ROOT}
        render={(prop)=>{
          return <MainPage
            {...prop}
            onFollowingToMyList={() => prop.history.push(AppRoute.MY_LIST)}
            onFollowingToPlayer={(promo) => prop.history.push(`${AppRoute.PLAYER}/${promo.id}`)}
          />;
        }}
      >
      </Route>
      <Route exact path={AppRoute.LOGIN}>
        <SignInPage></SignInPage>
      </Route>
      <PrivateRoute exact
        path={AppRoute.MY_LIST}
        render={()=>(<MyListPage></MyListPage>)}
      ></PrivateRoute>
      <Route exact path={AppRoute.FILM_WITH_PARAMETR}
        render= {(prop)=> (
          <MoviePage
            {...prop}
            onFollowingToPlayer= {(film) => prop.history.push(`${AppRoute.PLAYER}/${film}`)}
            onFollowingToMyList={() => prop.history.push(AppRoute.MY_LIST)}
          ></MoviePage>
        )}>
      </Route>
      <PrivateRoute exact path={AppRoute.REVIEW_WITH_PARAMETR}
        render= {(prop)=> (
          <AddReviewPage
            {...prop}
          ></AddReviewPage>
        )}>
      </PrivateRoute>
      <Route exact path={AppRoute.PLAYER_WITH_PARAMETR}
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
