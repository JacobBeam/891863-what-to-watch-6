import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';
import {filmsPropTypes} from '../../utils/prop-types';

const MyListPage = (props) =>{

  const {films} = props;

  const [activeFilmCard, setActiveFilmCard] = useState({id: ``});

  const handleAddActiveCard = (currentTarget) => {
    setActiveFilmCard({...activeFilmCard, id: currentTarget.dataset.filmId});
  };

  const handleDeleteActiveCard = () => {
    setActiveFilmCard({...activeFilmCard, id: ``});
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <h1 className="page-title user-page__title">My list</h1>
        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
          </div>
        </div>
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__movies-list">

          {films.filter((film)=>film.isFavorite)
          .map((element)=><MovieCard
            key={element.id}
            film={element}
            onAddActiveCard={handleAddActiveCard}
            onDeleteActiveCard={handleDeleteActiveCard}
          ></MovieCard>)}


        </div>
      </section>
      <footer className="page-footer">
        <div className="logo">
          <Link to="/" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>

  );
};

MyListPage.propTypes = filmsPropTypes;

export default MyListPage;
