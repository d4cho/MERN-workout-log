import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';

import Chart from './Sections/Chart';
import PersonalRecords from './Sections/PersonalRecords';
import Totals from './Sections/Totals';
import PulseLoader from 'react-spinners/PulseLoader';

import axios from 'axios';

const StatisticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [workouts, setWorkout] = useState([]);
  const [targetExercise, setTargetExercise] = useState('Select an exercise');

  useEffect(() => {
    axios.get('/api/workouts/getLogs').then((response) => {
      if (response.data.success) {
        setWorkout(response.data.workouts.reverse());
        setIsLoading(false);
      } else {
        alert('Failed to get workout data');
      }
    });
  }, []);

  // create an array of just exercise names (no duplicates)
  const exerciseList = [
    // new Set constructor stores unique values
    ...new Set(
      workouts
        .map((session) => session.exercises)
        .map((workout) => workout.map((exercise) => exercise.name))
        .flat() // to flatten nested arrays
        .sort() // sort by alphabetical order
    )
  ];

  // array of exercise info depending on state of targetExercise
  const exerciseStats = [];
  workouts.forEach((session) => {
    for (const exercise of session.exercises) {
      if (exercise.name === targetExercise) {
        exerciseStats.push({
          date: session.createdAt,
          info: exercise.info
        });
      }
    }
  });

  const targetExerciseChangeHandler = (e) => {
    setTargetExercise(e.currentTarget.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: '48px',
        width: '50%'
      }}>
      {isLoading ? (
        <PulseLoader size={25} color={'#0000FF'} />
      ) : (
        <>
          <Input
            style={{ fontSize: '24px' }}
            type='select'
            name='exerciseName'
            id='exerciseName'
            value={targetExercise}
            onChange={targetExerciseChangeHandler}>
            <option>{'Select an exercise'}</option>
            {exerciseList.map((exerciseName, i) => (
              <option key={i}>{exerciseName}</option>
            ))}
          </Input>
          <div
            style={{
              width: '900px',
              height: '700px',
              marginLeft: '-100px'
            }}>
            <Chart exerciseStats={exerciseStats} />
          </div>
          <br />
          <PersonalRecords exerciseStats={exerciseStats} />
          <br />
          <Totals exerciseStats={exerciseStats} />
        </>
      )}
    </div>
  );
};

export default StatisticsPage;
