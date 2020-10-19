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
        console.log(response.data.favorites);
        setPosts(response.data.favorites);
        setIsLoading(false);
      } else {
        console.log('failed to get favorites info');
      }
    });
  }, []);

  const renderPosts = posts.map((post, index) => {
    let categoryName = '';
    for (const category of categories) {
      if (category._id === post.postId.category) {
        categoryName = category.name;
      }
    }
    return (
      <Col key={index} sm='12' md='6' lg='3' style={{ marginBottom: '24px' }}>
        <Link
          to={`/posts/${post.postId._id}`}
          style={{ textDecoration: 'none', color: 'black' }}>
          <Card style={{ cursor: 'pointer' }}>
            <CardImg
              top
              width='100%'
              height='300px'
              src={
                post.postId.images[0]
                  ? `http://localhost:5000/${post.postId.images[0]}`
                  : `http://localhost:5000/uploads/default_post_pic.png`
              }
              alt='post image'
            />
            <CardBody>
              <CardTitle>By {post.postWriterId.username}</CardTitle>
              <CardTitle style={{ fontWeight: 'bold' }}>
                {post.postId.title}
              </CardTitle>
              <CardText>{categoryName}</CardText>
            </CardBody>
          </Card>
        </Link>
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
