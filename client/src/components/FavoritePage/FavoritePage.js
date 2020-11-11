import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { categories } from '../PostsPage/Sections/CategoryData';

import ProfilePic from '../utils/ProfilePic';
import PulseLoader from 'react-spinners/PulseLoader';

const FavoritePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const variables = {
      userId: userId
    };

    axios.post('api/favorites/getFavorites', variables).then((response) => {
      if (response.data.success) {
        setPosts(response.data.favorites);
        setIsLoading(false);
      } else {
        alert('failed to get favorites info');
      }
    });
  }, []);

  // change host for production mode
  let host = 'http://localhost:5000/';
  if (process.env.NODE_ENV === 'production') {
    host = '/';
  }

  const renderPosts = posts.map((post, index) => {
    let categoryName = '';
    for (const category of categories) {
      if (category._id === post.postId.category) {
        categoryName = category.name;
      }
    }
    return (
      <Col key={index} sm='12' md='6' lg='3' style={{ marginBottom: '24px' }}>
        <Card>
          <Link
            to={`/posts/${post.postId._id}`}
            style={{ textDecoration: 'none', color: 'black' }}>
            <CardImg
              style={{ cursor: 'pointer' }}
              top
              width='100%'
              height='300px'
              src={
                post.postId.images[0]
                  ? `${host}${post.postId.images[0]}`
                  : require('../../assets/images/default_post_pic.jpg')
              }
              alt='post image'
            />
          </Link>
          <CardBody>
            <CardTitle
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <ProfilePic
                width={'48px'}
                height={'48px'}
                image={post.postWriterId.image}
                userId={post.postWriterId._id}
              />
              {post.postWriterId && <h5>{post.postWriterId.username}</h5>}
            </CardTitle>
            <CardTitle>
              <h4>{post.postId.title}</h4>
            </CardTitle>
            <CardText>{categoryName}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <br />
      <h1>My Favorited Posts</h1>
      <hr />
      <br />
      <Row>
        {isLoading ? <PulseLoader size={25} color={'#0000FF'} /> : renderPosts}
      </Row>
      <br />
      <br />
    </div>
  );
};

export default FavoritePage;
