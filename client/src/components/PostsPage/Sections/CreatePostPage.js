import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { categories } from './CategoryData';
import axios from 'axios';

import PulseLoader from 'react-spinners/PulseLoader';

import UploadMedia from './UploadMedia';
import notificationHandler from '../../utils/notificationHandler';

const CreatePostPage = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(1);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const updateVideo = (newVideo) => {
    setVideos(newVideo);
  };

  const onSubmit = () => {
    setIsloading(true);

    let dataToSubmit = {
      title,
      description,
      category,
      images,
      videos
    };

    axios.post('/api/posts/createPost', dataToSubmit).then((response) => {
      if (response.data.success) {
        setIsloading(false);

        // post creater may have multiple followers to notify
        for (const follower of response.data.followers) {
          notificationHandler(
            'post',
            response.data.post._id,
            response.data.post.writer,
            follower
          );
        }

        props.history.push('/posts');
      } else {
        alert('failed to upload post');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '60%',
        marginLeft: '20%',
        marginBottom: '10%'
      }}>
      <br />
      <br />
      <h1 style={{ marginBottom: '48px' }}>Create a Post</h1>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for='title'>Title</Label>
          <Input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={onTitleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='description'>Description</Label>
          <Input
            type='textarea'
            name='description'
            id='description'
            value={description}
            onChange={onDescriptionChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='category'>Category</Label>
          <Input
            type='select'
            name='select'
            id='category'
            value={category}
            onChange={onCategoryChange}>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <UploadMedia image refreshFunction={updateImages} />
          <FormText color='muted'>Click a picture to remove</FormText>
        </FormGroup>
        <FormGroup>
          <UploadMedia video refreshFunction={updateVideo} />
        </FormGroup>
        <br />
        <br />
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <h2>Uploading Post...</h2>
            <PulseLoader size={25} color={'#0000FF'} />
          </div>
        ) : (
          <Button color='primary' size='lg' block onClick={onSubmit}>
            Upload Post
          </Button>
        )}
        <br />
        <br />
      </Form>
    </div>
  );
};

export default CreatePostPage;
