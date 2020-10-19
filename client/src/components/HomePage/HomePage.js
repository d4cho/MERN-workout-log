import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Input
} from 'reactstrap';

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
        console.log(response.data.posts);
        setRecentPosts(response.data.posts);
        setRecentIsLoading(false);
      } else {
        alert('failed to get recent posts');
      }
    });

    variables.popular = true;
    axios.post('/api/posts/getPosts', variables).then((response) => {
      if (response.data.success) {
        console.log('popular', response.data.posts);
        setPopularPosts(response.data.posts);
        setPopularIsLoading(false);
      } else {
        alert('failed to get popular posts');
      }
    });
  }, []);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', margin: '24px 48px' }}>
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
        <br />
        <br />
        <hr />
      </div>
    </div>
  );
};

export default HomePage;
