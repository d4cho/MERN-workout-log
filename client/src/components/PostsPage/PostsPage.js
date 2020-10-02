import React, { useState, useEffect, useRef } from 'react';
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
import axios from 'axios';
import { categories } from './Sections/CategoryData';

const PostsPage = (props) => {
  // const buttonRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const variables = {
      skip,
      limit
    };

    getPosts(variables);
  }, []);

  // to enable loading posts on scroll down
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  // }, []);

  // const handleScroll = () => {
  //   const windowHeight =
  //     'innerHeight' in window
  //       ? window.innerHeight
  //       : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(
  //     body.scrollHeight,
  //     body.offsetHeight,
  //     html.clientHeight,
  //     html.scrollHeight,
  //     html.offsetHeight
  //   );
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   if (windowBottom >= docHeight - 1) {
  //     // loadMoreItems()
  //     console.log('clicked');
  //     buttonRef.current.click();
  //   }
  // };

  const getPosts = (variables) => {
    axios.post('/api/posts/getPosts', variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          console.log(response.data.posts);
          setPosts([...posts].concat(response.data.posts));
        } else {
          console.log(response.data.posts);
          setPosts(response.data.posts);
        }
      } else {
        alert('failed to get posts from server');
      }
    });
  };

  const loadMoreClicked = () => {
    let newSkip = skip + limit;

    const variables = {
      skip: newSkip,
      limit: limit,
      loadMore: true,
      filter,
      search
    };

    getPosts(variables);
    setSkip(newSkip);
  };

  const handleFilterChange = (e) => {
    console.log(e.currentTarget.value);

    if (e.currentTarget.value === '0') {
      setFilter('');
      const variables = {
        skip: 0,
        limit
      };

      console.log(variables);
      getPosts(variables);
    } else {
      setFilter(e.currentTarget.value);

      const variables = {
        skip: 0,
        limit,
        filter: e.currentTarget.value
      };

      console.log(variables);
      getPosts(variables);
    }

    setSkip(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.currentTarget.value);
    console.log(e.currentTarget.value);

    const variables = {
      skip: 0,
      limit,
      filter,
      search: e.currentTarget.value
    };

    getPosts(variables);
    setSkip(0);
  };

  const onPostClicked = (post) => {
    console.log(post);
  };

  const renderPosts = posts.map((post, index) => {
    let categoryName = '';
    for (const category of categories) {
      if (category._id === post.category) {
        categoryName = category.name;
      }
    }

    return (
      <Col key={index} sm='12' md='6' lg='3' style={{ marginBottom: '24px' }}>
        <Card style={{ cursor: 'pointer' }} onClick={() => onPostClicked(post)}>
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
      </Col>
    );
  });

  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Link to='/createpost'>
          <Button color='primary'>Create New Post</Button>
        </Link>
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly'
        }}>
        <div style={{ width: '40%' }}>
          <span>Filter by Category</span>
          <Input type='select' value={filter} onChange={handleFilterChange}>
            <option value={0}>All</option>
            {categories.map((category, i) => (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            ))}
          </Input>
        </div>
        <div style={{ width: '40%' }}>
          <span>Search posts</span>
          <Input type='text' value={search} onChange={handleSearchChange} />
        </div>
      </div>
      <hr />
      <br />
      <br />
      <Row>{renderPosts}</Row>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          // ref={buttonRef}
          onClick={loadMoreClicked}>
          Load more posts
        </button>
      </div>
    </div>
  );
};

export default PostsPage;
