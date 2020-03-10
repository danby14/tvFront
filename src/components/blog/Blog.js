import React from 'react';
// import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Person from '../../assets/Person';
import GrowthChart from '../../assets/GrowthChart';

const Blog = () => {
  // let { path } = useRouteMatch();
  return (
    <div className='content has-text-centered'>
      <GrowthChart size={60} />
      <p className='title has-text-primary'>Blog</p>
      <p className='has-text-dark'>words go here</p>
      <Person size={30} />
      {/* <Switch>
        <Route exact path={`${path}/2`}>
          <MakePredictions2 />
        </Route>
        <Route exact path={`${path}/3`}>
          <MakePredictions3 />
        </Route>
      </Switch> */}
    </div>
  );
};

export default Blog;
