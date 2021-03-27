import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {filmPropTypes} from '../../utils/prop-types';
import {getSelectedMovie} from '../../store/film-data/selectors';
import Tab from '../tab/tab';
import TabOverview from '../tab-overview/tab-overview';
import TabDetails from '../tab-details/tab-details';
import TabReviews from '../tab-reviews/tab-reviews';
import {TabType} from '../../utils/const';

const TabsList = (props)=>{

  const {selectedMovie} = props;
  const [activeTab, setActiveTab] = useState(TabType.OVERVIEW);

  useEffect(() => {
    setActiveTab(TabType.OVERVIEW);
  }, [selectedMovie]);

  const setActiveTabPage = (activeElement) =>{

    switch (activeElement) {
      case TabType.OVERVIEW:
        return <TabOverview></TabOverview>;
      case TabType.DETAILS:
        return <TabDetails></TabDetails>;
      case TabType.REVIEWS:
        return <TabReviews></TabReviews>;
    }

    return <TabOverview></TabOverview>;
  };

  return (

    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">

          { Object.values(TabType).map((element, id)=> {
            return (<Tab
              name={element}
              key={id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}></Tab>);
          })
          }

        </ul>
      </nav>
      {setActiveTabPage(activeTab)}
    </div>
  );
};

TabsList.propTypes = {
  selectedMovie: filmPropTypes.film,
};

const mapStateToProps = (state) => ({
  selectedMovie: getSelectedMovie(state)
});

export default connect(mapStateToProps, null)(TabsList);
