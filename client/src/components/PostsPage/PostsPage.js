import React, { useState } from 'react';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';

import CreatePostPage from './Sections/CreatePostPage';

const PostsPage = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <Link to='/createpost'>
          <Button color='primary'>Create New Post</Button>
        </Link>
      </div>
      <br />
      <br />
      <Row>
        <Col sm='12' md='6' lg='3'>
          <Card>
            <CardImg
              top
              width='100%'
              src='/assets/256x186.svg'
              alt='Card image cap'
            />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3'>
          <Card>
            <CardImg
              top
              width='100%'
              src='/assets/256x186.svg'
              alt='Card image cap'
            />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3'>
          <Card>
            <CardImg
              top
              width='100%'
              src='/assets/256x186.svg'
              alt='Card image cap'
            />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm='12' md='6' lg='3'>
          <Card>
            <CardImg
              top
              width='100%'
              src='/assets/256x186.svg'
              alt='Card image cap'
            />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button>Load More</Button>
      </div>
    </div>
  );
};

export default PostsPage;
