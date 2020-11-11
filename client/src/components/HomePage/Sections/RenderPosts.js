import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { categories } from '../../PostsPage/Sections/CategoryData';
import ProfilePic from '../../utils/ProfilePic';

const RenderPosts = (props) => {
  // change host for production mode
  let host = 'http://localhost:5000/';
  if (process.env.NODE_ENV === 'production') {
    host = '/';
  }

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
                  ? `${host}${post.images[0]}`
                  : require('../../../assets/images/default_post_pic.jpg')
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
