import React, {useState} from 'react';
import Tab from '../tab/tab';
import TabOverview from '../tab-overview/tab-overview';
import TabDetails from '../tab-details/tab-details';
import TabReviews from '../tab-reviews/tab-reviews';
import {TabType} from '../../utils/const';


const TabsList = ()=>{

  const [activeTab, setActiveTab] = useState(TabType.OVERVIEW);

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

export default TabsList;
