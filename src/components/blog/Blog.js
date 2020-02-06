import React from 'react';
import MakePredictions3 from '../league/predictions/MakePredictions3';
import MakePredictions2 from '../league/predictions/MakePredictions2';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Blog = () => {
  let { path } = useRouteMatch();
  return (
    <div className='content has-text-centered'>
      <p className='title has-text-primary'>Blog</p>
      <p className='has-text-dark'>words go here</p>
      {/* <ul>
        <li>
          <Link to={`${url}/2`}>2</Link>
        </li>
        <li>
          <Link to={`${url}/3`}>3</Link>
        </li>
      </ul> */}
      <Switch>
        <Route exact path={`${path}/2`}>
          <MakePredictions2 />
        </Route>
        <Route exact path={`${path}/3`}>
          <MakePredictions3 />
        </Route>
      </Switch>
    </div>
  );
};

export default Blog;
