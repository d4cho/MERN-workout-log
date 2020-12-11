import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import axios from 'axios';
import { categories } from './Sections/CategoryData';

import ProfilePic from '../utils/ProfilePic';
import PulseLoader from 'react-spinners/PulseLoader';

const PostsPage = (props) => {
  const userId = localStorage.getItem('userId');
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    let variables = {
      skip,
      limit
    };

    if (props.fromMyProfile) {
      variables = {
        skip,
        limit,
        profilePageUserId: props.profilePageUserId
      };
    }

    getPosts(variables);
  }, []);

  const getPosts = (variables) => {
    axios.post(`/api/posts/getPosts`, variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setPosts([...posts].concat(response.data.posts));
          setIsLoading(false);
        } else {
          setPosts(response.data.posts);
          setIsLoading(false);
        }
      } else {
        alert('failed to get posts from server');
      }
    });
  };

  const loadMoreClicked = () => {
    let newSkip = skip + limit;

    let variables = {
      skip: newSkip,
      limit: limit,
      loadMore: true,
      filter,
      search
    };

    if (props.fromMyProfile) {
      variables.profilePageUserId = props.profilePageUserId;
    }

    if (sortBy === 'popular') {
      variables.sortBy = sortBy;
    } else if (sortBy === 'oldest') {
      variables.sortBy = sortBy;
    }

    getPosts(variables);
    setSkip(newSkip);
  };

  const handleFilterChange = (e) => {
    let variables = {
      skip: 0,
      limit
    };

    if (props.fromMyProfile) {
      variables.profilePageUserId = props.profilePageUserId;
    }

    if (sortBy === 'popular') {
      variables.sortBy = sortBy;
    } else if (sortBy === 'oldest') {
      variables.sortBy = sortBy;
    }

    if (e.currentTarget.value === '0') {
      setFilter('');
      if (props.fromMyProfile) {
        variables.profilePageUserId = props.profilePageUserId;
      }

      getPosts(variables);
    } else {
      setFilter(e.currentTarget.value);

      variables.filter = e.currentTarget.value;
      if (props.fromMyProfile) {
        variables.profilePageUserId = props.profilePageUserId;
      }

      getPosts(variables);
    }

    setSkip(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.currentTarget.value);

    let variables = {
      skip: 0,
      limit,
      filter,
      search: e.currentTarget.value
    };

    if (props.fromMyProfile) {
      variables.profilePageUserId = props.profilePageUserId;
    }

    if (sortBy === 'popular') {
      variables.sortBy = sortBy;
    } else if (sortBy === 'oldest') {
      variables.sortBy = sortBy;
    }

    getPosts(variables);
    setSkip(0);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.currentTarget.value);

    let variables = {
      skip: 0,
      limit,
      filter,
      sortBy: e.currentTarget.value
    };

    if (props.fromMyProfile) {
      variables.profilePageUserId = props.profilePageUserId;
    }

    if (e.currentTarget.value === 'popular') {
      variables.popular = true;
    } else if (e.currentTarget.value === 'oldest') {
      variables.oldest = true;
    }

    getPosts(variables);
    setSkip(0);
  };

  // change host for production mode
  let host = 'http://localhost:5000/';
  if (process.env.NODE_ENV === 'production') {
    host = '/';
  }

  const renderPosts = posts.map((post, index) => {
    let categoryName = '';
    for (const category of categories) {
      if (category._id === post.category) {
        categoryName = category.name;
      }
    }

    return (
      <Col key={index} sm='12' md='6' lg='3' style={{ marginBottom: '24px' }}>
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
                image={post.writer.image}
                userId={post.writer._id}
              />
              {post.writer && (
                <h5 style={{ paddingLeft: '12px' }}>{post.writer.username}</h5>
              )}
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

  let parentDivStyle = { width: '80%', margin: '3rem auto' };
  if (props.fromMyProfile) {
    parentDivStyle = { width: '100%', margin: '3rem auto' };
  }

  return (
    <div style={parentDivStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {!props.fromMyProfile ? (
          <Link to='/createpost'>
            <Button color='primary'>Create New Post</Button>
          </Link>
        ) : props.profilePageUserId === userId ? (
          <Link to='/createpost'>
            <Button color='primary'>Create New Post</Button>
          </Link>
        ) : null}
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}>
        <div style={{ width: '100%', paddingBottom: '12px' }}>
          <span>Search posts</span>
          <Input type='text' value={search} onChange={handleSearchChange} />
        </div>
        <div style={{ width: '100%', paddingBottom: '12px' }}>
          <span>Filter by category</span>
          <Input type='select' value={filter} onChange={handleFilterChange}>
            <option value={0}>All</option>
            {categories.map((category, i) => (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            ))}
          </Input>
        </div>
        <div style={{ width: '100%', paddingBottom: '12px' }}>
          <span>View by</span>
          <Input type='select' value={sortBy} onChange={handleSortByChange}>
            <option value={'recent'}>Date Added (recent)</option>
            <option value={'oldest'}>Date Added (oldest)</option>
            <option value={'popular'}>Most Popular</option>
          </Input>
        </div>
      </div>
      <hr />
      <br />
      <br />
      <Row>
        {isLoading ? <PulseLoader size={25} color={'#0000FF'} /> : renderPosts}
      </Row>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          color='primary'
          // ref={buttonRef}
          onClick={loadMoreClicked}>
          Load more posts
        </Button>
      </div>
    </div>
  );
};

export default PostsPage;
