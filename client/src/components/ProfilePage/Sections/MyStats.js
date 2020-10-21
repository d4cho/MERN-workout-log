import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ProfilePicUpload from '../../utils/ProfilePicUpload';
import ProfilePic from '../../utils/ProfilePic';

const MyStats = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [weight, setWeight] = useState(props.userData.weight);
  const [squat, setSquat] = useState(props.userData.squat);
  const [bench, setBench] = useState(props.userData.bench);
  const [deadlift, setDeadlift] = useState(props.userData.deadlift);
  const [image, setImage] = useState(props.userData.image);

  const userId = localStorage.getItem('userId');

  const weightChangeHandler = (e) => {
    setWeight(e.currentTarget.value);
  };

  const squatChangeHandler = (e) => {
    setSquat(e.currentTarget.value);
  };

  const benchChangeHandler = (e) => {
    setBench(e.currentTarget.value);
  };

  const deadliftChangeHandler = (e) => {
    setDeadlift(e.currentTarget.value);
  };

  const handleSubmit = () => {
    const userInfo = {
      userId: userId,
      weight,
      squat,
      bench,
      deadlift,
      image
    };
  };

  const editClickedHandler = () => {
    setShowEdit(true);
  };

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  if (showEdit) {
    return (
      <div className='container'>
        <h1 style={{ marginBottom: '48px' }}>My Profile</h1>
        <Form onSubmit={handleSubmit}>
          <ProfilePicUpload refreshFunction={updateImage} image={image} />
          <div style={{ textAlign: 'center' }}>Click image to edit</div>
          <br />
          <br />
          <FormGroup>
            <Label for='weight'>Current Body Weight</Label>
            <Input
              type='number'
              name='weight'
              id='weight'
              bsSize='lg'
              value={weight}
              onChange={weightChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for='squat'>Squat 1RM</Label>
            <Input
              type='number'
              name='squat'
              id='squat'
              bsSize='lg'
              value={squat}
              onChange={squatChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for='bench'>Bench 1RM</Label>
            <Input
              type='number'
              name='bench'
              id='bench'
              bsSize='lg'
              value={bench}
              onChange={benchChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for='deadlift'>Deadlift 1RM</Label>
            <Input
              type='number'
              name='deadlift'
              id='deadlift'
              bsSize='lg'
              value={deadlift}
              onChange={deadliftChangeHandler}
            />
          </FormGroup>
          <Button
            style={{ marginTop: '24px' }}
            color='success'
            onClick={handleSubmit}>
            Save!
          </Button>
        </Form>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: '100%',
          padding: '3rem, 4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <h1>
          {props.profilePageUserId === userId
            ? 'My Profile'
            : `${props.userData.username}'s Profile`}
        </h1>
        <br />
        <ProfilePic width='240px' height='240px' image={image} />
        <br />
        <h4>Current Body Weight:</h4>
        <h3>{weight}</h3>
        <br />
        <h4>Squat 1RM:</h4>
        <h3>{squat}</h3>
        <br />
        <h4>Bench 1RM:</h4>
        <h3>{bench}</h3>
        <br />
        <h4>Deadlift 1RM:</h4>
        <h3>{deadlift}</h3>
        <br />
        {props.profilePageUserId == userId && (
          <Button color='primary' onClick={editClickedHandler}>
            Edit My Profile
          </Button>
        )}
      </div>
    );
  }
};

export default MyStats;
