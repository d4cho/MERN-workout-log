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

const RenderPosts = (props) => {
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
        <Link
          to={`/posts/${post._id}`}
          style={{ textDecoration: 'none', color: 'black' }}>
          <Card style={{ cursor: 'pointer' }}>
            <CardImg
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
            <CardBody>
              <CardTitle>By {post.writer && post.writer.username}</CardTitle>
              <CardTitle style={{ fontWeight: 'bold' }}>{post.title}</CardTitle>
              <CardText>{categoryName}</CardText>
            </CardBody>
          </Card>
        </Link>
      </Col>
    );
  });

  return <div style={{ display: 'flex' }}>{renderPosts}</div>;
};

export default RenderPosts;
