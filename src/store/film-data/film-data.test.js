import {filmData} from './film-data';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {ActionCreator, ActionType} from '../action';
import {allGenreFilter, adaptToClient} from '../../utils/const';
import {fetchFilmsList, fetchPromoFilm, fetchFilmById, postFavoriteStatus, postFavoriteStatusPromo, fetchFavoritesFilms} from '../api-action';

const api = createAPI(() => {});
const films = [
  {
    "name": "Macbeth",
    "posterImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Macbeth.jpg",
    "previewImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/macbeth.jpg",
    "backgroundImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Macbeth.jpg",
    "backgroundColor": "#F1E9CE",
    "description": "Macbeth, the Thane of Glamis, receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders his king and takes the throne for himself.",
    "rating": 3.3,
    "scoresCount": 48798,
    "director": "Justin Kurzel",
    "starring": [
      "Michael Fassbender",
      "Marion Cotillard",
      "Jack Madigan"
    ],
    "runTime": 113,
    "genre": "Drama",
    "released": 2015,
    "id": 1,
    "isFavorite": false,
    "videoLink": "http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4",
    "previewVideoLink": "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm"
  },
  {
    "name": "Beach",
    "posterImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/beach.jpg",
    "previewImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/beach.jpg",
    "backgroundImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/background/beach.jpg",
    "backgroundColor": "#EBC996",
    "description": "Vicenarian Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss. Excited and intrigued, he sets out to find it.",
    "rating": 3.3,
    "scoresCount": 207824,
    "director": "Danny Boyle",
    "starring": [
      "Leonardo DiCaprio",
      "Daniel York",
      "Patcharawan Patarakijjanon"
    ],
    "runTime": 119,
    "genre": "Adventure",
    "released": 2000,
    "id": 2,
    "isFavorite": false,
    "videoLink": "http://media.xiph.org/mango/tears_of_steel_1080p.webm",
    "previewVideoLink": "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm"
  }];

  const filmFromServer = {
    "name": "Beach",
    "poster_image": "https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/beach.jpg",
    "preview_image": "https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/beach.jpg",
    "background_image": "https://assets.htmlacademy.ru/intensives/javascript-3/film/background/beach.jpg",
    "background_color": "#EBC996",
    "description": "Vicenarian Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss. Excited and intrigued, he sets out to find it.",
    "rating": 3.3,
    "scores_count": 207824,
    "director": "Danny Boyle",
    "starring": [
      "Leonardo DiCaprio",
      "Daniel York",
      "Patcharawan Patarakijjanon"
    ],
    "run_time": 119,
    "genre": "Adventure",
    "released": 2000,
    "id": 0,
    "is_favorite": false,
    "video_link": "http://media.xiph.org/mango/tears_of_steel_1080p.webm",
    "preview_video_link": "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm"
  };

  const film =
    {
      "name": "Beach",
      "posterImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/beach.jpg",
      "previewImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/beach.jpg",
      "backgroundImage": "https://assets.htmlacademy.ru/intensives/javascript-3/film/background/beach.jpg",
      "backgroundColor": "#EBC996",
      "description": "Vicenarian Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss. Excited and intrigued, he sets out to find it.",
      "rating": 3.3,
      "scoresCount": 207824,
      "director": "Danny Boyle",
      "starring": [
        "Leonardo DiCaprio",
        "Daniel York",
        "Patcharawan Patarakijjanon"
      ],
      "runTime": 119,
      "genre": "Adventure",
      "released": 2000,
      "id": 0,
      "isFavorite": false,
      "videoLink": "http://media.xiph.org/mango/tears_of_steel_1080p.webm",
      "previewVideoLink": "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm"
    }

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(filmData(undefined, {}))
      .toEqual({
        films: [],
        isFilmsLoaded: false,
        selectedMovie: {},
        isSelectedFilmLoaded: false,
        genre: allGenreFilter.ALL_GENRES,
        promo: {},
        isPromoLoaded: false,
        favoritesFilms: [],
        isFavoritesFilmsLoaded: false
      });
  });

  it(`Reducer should change current genre`, () => {
    const state = {films: [],
      isFilmsLoaded: false,
      selectedMovie: {},
      isSelectedFilmLoaded: false,
      genre: allGenreFilter.ALL_GENRES,
      promo: {},
      isPromoLoaded: false,
      favoritesFilms: [],
      isFavoritesFilmsLoaded: false};

    const testGenre = `Test genre`;

    expect(filmData(state, ActionCreator.changeGenre(testGenre)))
      .toEqual({films: [],
        isFilmsLoaded: false,
        selectedMovie: {},
        isSelectedFilmLoaded: false,
        genre: testGenre,
        promo: {},
        isPromoLoaded: false,
        favoritesFilms: [],
        isFavoritesFilmsLoaded: false});
  });

  it(`Reducer should reset genre`, () => {
    const state = {films: [],
      isFilmsLoaded: false,
      selectedMovie: {},
      isSelectedFilmLoaded: false,
      genre: 'Test genre',
      promo: {},
      isPromoLoaded: false,
      favoritesFilms: [],
      isFavoritesFilmsLoaded: false};

    const defaultGenre = `All genres`;

    expect(filmData(state, ActionCreator.resetGenre()))
      .toEqual({films: [],
        isFilmsLoaded: false,
        selectedMovie: {},
        isSelectedFilmLoaded: false,
        genre: defaultGenre,
        promo: {},
        isPromoLoaded: false,
        favoritesFilms: [],
        isFavoritesFilmsLoaded: false});
  });

  it(`Reducer should reset loadded status`, () => {
    const state = {films: [],
      isFilmsLoaded: false,
      selectedMovie: {},
      isSelectedFilmLoaded: true,
      genre: 'Test genre',
      promo: {},
      isPromoLoaded: true,
      favoritesFilms: [],
      isFavoritesFilmsLoaded: true};

    expect(filmData(state, ActionCreator.resetLoadedStatus()))
      .toEqual({films: [],
        isFilmsLoaded: false,
        selectedMovie: {},
        isSelectedFilmLoaded: false,
        genre: 'Test genre',
        promo: {},
        isPromoLoaded: false,
        favoritesFilms: [],
        isFavoritesFilmsLoaded: false});
  });

  it(`Reducer should update films by load films`, () => {
    const state = {films: [],
      isFilmsLoaded: false,
      selectedMovie: {},
      isSelectedFilmLoaded: true,
      genre: 'Test genre',
      promo: {},
      isPromoLoaded: true,
      favoritesFilms: [],
      isFavoritesFilmsLoaded: true};

    const loadFilmsAction = {
      type: ActionType.LOAD_FILMS,
      payload: films
    };

    expect(filmData(state, loadFilmsAction))
      .toEqual({films,
        isFilmsLoaded: true,
        selectedMovie: {},
        isSelectedFilmLoaded: true,
        genre: 'Test genre',
        promo: {},
        isPromoLoaded: true,
        favoritesFilms: [],
        isFavoritesFilmsLoaded: true
      });
  });

  it(`Reducer should update film by load film`, () => {
    const state = {films: [],
      isFilmsLoaded: false,
      selectedMovie: {},
      isSelectedFilmLoaded: false,
      genre: 'Test genre',
      promo: {},
      isPromoLoaded: true,
      favoritesFilms: [],
      isFavoritesFilmsLoaded: true};

    const loadFilmAction = {
      type: ActionType.SELECT_FILM,
      payload: film
    };

    expect(filmData(state, loadFilmAction))
      .toEqual({films: [],
        isFilmsLoaded: false,
        selectedMovie: film,
        isSelectedFilmLoaded: true,
        genre: 'Test genre',
        promo: {},
        isPromoLoaded: true,
        favoritesFilms: [],
        isFavoritesFilmsLoaded: true
      });
  });

  it(`Reducer should update promo by load promo`, () => {
    const state = {films: [],
      isFilmsLoaded: false,
      selectedMovie: {},
      isSelectedFilmLoaded: false,
      genre: 'Test genre',
      promo: {},
      isPromoLoaded: false,
      favoritesFilms: [],
      isFavoritesFilmsLoaded: true};

    const loadPromoAction = {
      type: ActionType.LOAD_PROMO,
      payload: film
    };

    expect(filmData(state, loadPromoAction))
      .toEqual({films: [],
        isFilmsLoaded: false,
        selectedMovie: {},
        isSelectedFilmLoaded: false,
        genre: 'Test genre',
        promo: film,
        isPromoLoaded: true,
        favoritesFilms: [],
        isFavoritesFilmsLoaded: true
      });
  });

  it(`Reducer should update favorites by load favorites`, () => {
    const state = {films: [],
      isFilmsLoaded: false,
      selectedMovie: {},
      isSelectedFilmLoaded: false,
      genre: 'Test genre',
      promo: {},
      isPromoLoaded: false,
      favoritesFilms: [],
      isFavoritesFilmsLoaded: false};

    const loadFavoritesAction = {
      type: ActionType.LOAD_FAVORITES_FILMS,
      payload: films
    };

    expect(filmData(state, loadFavoritesAction))
      .toEqual({films: [],
        isFilmsLoaded: false,
        selectedMovie: {},
        isSelectedFilmLoaded: false,
        genre: 'Test genre',
        promo: {},
        isPromoLoaded: false,
        favoritesFilms: films,
        isFavoritesFilmsLoaded: true
      });
  });
  it(`The adapter worked correctly`, () => {

      expect (adaptToClient(filmFromServer))
      .toEqual(film)
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = fetchFilmsList();

    apiMock
      .onGet(`/films`)
      .reply(200, [filmFromServer]);

    return filmsLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [film],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = fetchPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, filmFromServer);

    return promoLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO,
          payload: film,
        });
      });
  });

  it(`Should make a correct API call to /films/id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 0
    const filmByIdLoader = fetchFilmById(id);


    apiMock
      .onGet(`/films/${id}`)
      .reply(200, filmFromServer);

    return filmByIdLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SELECT_FILM,
          payload: film,
        });
      });
  });

  it(`Should make a correct API call to /favorite/id/status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 0;
    const status = true;
    const postStatusLoader = postFavoriteStatus(id, status);


    apiMock
      .onPost(`/favorite/${id}/${Number(!status)}`)
      .reply(200, filmFromServer);

    return postStatusLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SELECT_FILM,
          payload: film,
        });
      });
  });

  it(`Should make a correct API call to /favorite/id/status for promo` , () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 0;
    const status = true;
    const postPromoStatusLoader = postFavoriteStatusPromo(id, status);


    apiMock
      .onPost(`/favorite/${id}/${Number(!status)}`)
      .reply(200, filmFromServer);

    return postPromoStatusLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO,
          payload: film,
        });
      });
  });

  it(`Should make a correct API call to /favorite` , () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavoritesFilms();


    apiMock
      .onGet(`/favorite`)
      .reply(200, [filmFromServer]);

    return favoritesLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES_FILMS,
          payload: [film],
        });
      });
  });
});
