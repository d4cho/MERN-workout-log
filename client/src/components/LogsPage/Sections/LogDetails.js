import React, { useState } from 'react';
import axios from 'axios';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Moment from 'react-moment';

import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import ExerciseTable from './ExerciseTable';

const LogDetails = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const renderTables = props.exercises.map((exercise, i) => {
    return (
      <div key={exercise.name + i}>
        <ExerciseTable exercise={exercise} style />
      </div>
    );
  });

  const toggleDeleteClicked = () => {
    setShowDeleteOptions(!showDeleteOptions);
  };

  const noClicked = () => {
    setShowDeleteOptions(false);
  };

  const yesClicked = () => {
    console.log(props.id);
    let variables = {
      workoutId: props.id
    };
    axios.post('/api/workouts/deleteWorkout', variables).then((response) => {
      if (response.data.success) {
        alert(`${response.data.msg}`);
        window.location.reload(true);
      } else {
        alert('Failed to delete workout');
      }
    });
  };

  return (
    <div style={{ margin: '24px' }}>
      <Button color='primary' onClick={toggle} style={{ marginBottom: '1rem' }}>
        <Moment format='MMMM DD (dddd), YYYY'>{props.date}</Moment> |{' '}
        {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </Button>
      <Collapse isOpen={isOpen}>
        <div style={{ margin: '0 0 16px', padding: '6px 12px' }}>
          <Button color='danger' onClick={toggleDeleteClicked}>
            Delete Workout
          </Button>
        </div>
        {showDeleteOptions ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ padding: '12px', fontWeight: 'bold' }}>
              Confirm Delete?
            </div>
            <div>
              <Button onClick={yesClicked}>Yes</Button>
              <Button onClick={noClicked}>No</Button>
            </div>
          </div>
        ) : null}
        <Card>
          <CardBody>{renderTables}</CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default LogDetails;
