import React, {useState} from 'react';
import Tab from '../tab/tab';
import TabOverview from '../tab-overview/tab-overview';
import TabDetails from '../tab-details/tab-details';
import TabReviews from '../tab-reviews/tab-reviews';
import {TabType} from '../../utils/const';
import comments from '../../mocks/comments';
import {filmPropTypes} from '../../utils/prop-types';

const TabsList = (props)=>{

  const [activeTab, setActiveTab] = useState(TabType.OVERVIEW);

  const {film} = props;

  const setActiveTabPage = (activeElement) =>{

    switch (activeElement) {

      case `Overview`:
        return <TabOverview film={film}></TabOverview>;

      case `Details`:
        return <TabDetails film={film}></TabDetails>;

      case `Reviews`:
        return <TabReviews comments={comments}></TabReviews>;
    }

    return <TabOverview film={film}></TabOverview>;
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

TabsList.propTypes = filmPropTypes;

export default TabsList;
