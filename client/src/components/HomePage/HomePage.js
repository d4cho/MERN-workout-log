import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

import PulseLoader from 'react-spinners/PulseLoader';
import { FaDumbbell } from 'react-icons/fa';
import RenderPosts from './Sections/RenderPosts';

const HomePage = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentIsLoading, setRecentIsLoading] = useState(true);
  const [popularIsLoading, setPopularIsLoading] = useState(true);

  let variables = {
    limit: 4,
    skip: 0
  };

  useEffect(() => {
    axios.post('/api/posts/getPosts', variables).then((response) => {
      if (response.data.success) {
        setRecentPosts(response.data.posts);
        setRecentIsLoading(false);
      } else {
        alert('failed to get recent posts');
      }
    });

    variables.sortBy = 'popular';
    axios.post('/api/posts/getPosts', variables).then((response) => {
      if (response.data.success) {
        setPopularPosts(response.data.posts);
        setPopularIsLoading(false);
      } else {
        alert('failed to get popular posts');
      }
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        margin: '3rem auto'
      }}>
      <br />
      <a href='/mylogs' style={{ textDecoration: 'none' }}>
        <Button
          style={{ display: 'block', margin: 'auto' }}
          color='primary'
          size='large'
          block>
          <h1>
            <FaDumbbell />
            <br />
            Log a Workout
          </h1>
        </Button>
        <br />
        <br />
        <hr />
      </a>
      <div>
        <h2>Recent Posts</h2>
        <br />
        {recentIsLoading ? (
          <PulseLoader size={25} color={'#0000FF'} />
        ) : (
          <RenderPosts posts={recentPosts} />
        )}
        <br />
        <br />
        <hr />
      </div>
      <div>
        <h2>Popular Posts</h2>
        <br />
        {popularIsLoading ? (
          <PulseLoader size={25} color={'#0000FF'} />
        ) : (
          <RenderPosts posts={popularPosts} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
