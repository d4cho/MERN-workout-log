import React, { useState } from 'react';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { categories } from '../../PostsPage/Sections/CategoryData';
import ProfilePic from '../../utils/ProfilePic';

const RenderPosts = (props) => {
  console.log(props.post);
  const renderPosts = props.posts.map((post) => {
    let categoryName = '';
    for (const category of categories) {
      if (category._id === post.category) {
        categoryName = category.name;
      }
    }

    return (
      <Col
        key={post._id}
        sm='12'
        md='6'
        lg='3'
        style={{ marginBottom: '24px' }}>
        <Card>
          <Link
            to={`/posts/${post._id}`}
            style={{ textDecoration: 'none', color: 'black' }}>
            <CardImg
              style={{ cursor: 'pointer' }}
              top
              width='100%'
              height='300px'
              src={
                post.images[0]
                  ? `http://localhost:5000/${post.images[0]}`
                  : `http://localhost:5000/uploads/default_post_pic.png`
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
                image={post.writer.image}
                userId={post.writer._id}
              />
              {post.writer && <h5>{post.writer.username}</h5>}
            </CardTitle>
            <CardTitle>
              <h4>{post.title}</h4>
            </CardTitle>
            <CardText>{categoryName}</CardText>
          </CardBody>
        </Card>
      </Col>
    );
  });

  return <div style={{ display: 'flex' }}>{renderPosts}</div>;
};

export default RenderPosts;
