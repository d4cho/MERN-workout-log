import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/NavBar/NavBar';
// components for router pages
import Auth from './hoc/auth';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import LogsPage from './components/LogsPage/LogsPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import PostsPage from './components/PostsPage/PostsPage';
import CreatePostPage from './components/PostsPage/Sections/CreatePostPage';
import PostDetailPage from './components/PostDetailPage/PostDetailPage';
import FavoritePage from './components/FavoritePage/FavoritePage';
import StatisticsPage from './components/StatisticsPage/StatisticsPage';

// true : for authenticated routes
// null : for routes that do not require authentication
// false : for routes that logged in users cannot access

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Auth(HomePage, null)} />
        <Route exact path='/register' component={Auth(RegisterPage, false)} />
        <Route exact path='/login' component={Auth(LoginPage, false)} />
        <Route exact path='/mylogs' component={Auth(LogsPage, true)} />
        <Route
          exact
          path='/mylogs/statistics'
          component={Auth(StatisticsPage, true)}
        />
        <Route
          exact
          path='/myprofile/:userId'
          component={Auth(ProfilePage, null)}
        />
        <Route
          exact
          path='/favoritePosts'
          component={Auth(FavoritePage, true)}
        />
        <Route exact path='/posts' component={Auth(PostsPage, null)} />
        <Route
          exact
          path='/posts/:postId'
          component={Auth(PostDetailPage, true)}
        />
        <Route
          exact
          path='/createpost'
          component={Auth(CreatePostPage, true)}
        />
      </Switch>
      <hr />
      <br />
      <br />
    </BrowserRouter>
  );
}

export default App;
