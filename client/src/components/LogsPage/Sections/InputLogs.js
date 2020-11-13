import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  UncontrolledAlert
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  setExercise,
  saveExercise,
  clearExercise,
  deleteSet,
  saveWorkout
} from '../../../redux/actions/workoutActions';

import ExerciseTable from './ExerciseTable';

const InputLogs = (props) => {
  const dispatch = useDispatch();

  const workout = useSelector((state) => state.workout);
  const user = useSelector((state) => state.user);

  const [showExerciseNameInput, setShowExerciseNameInput] = useState(true);
  const [exerciseName, setExerciseName] = useState('');
  const [reps, setReps] = useState('0');
  const [weight, setWeight] = useState('0');
  const [notes, setNotes] = useState('');
  const [showCurrentExerciseTable, setShowCurrentExerciseTable] = useState(
    false
  );
  const [disableCompleteSetButton, setDisableCompleteSetButton] = useState(
    true
  );
  const [disableNextExerciseButton, setDisableNextExerciseButton] = useState(
    true
  );
  const [msg, setMsg] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const exerciseNameChangeHandler = (e) => {
    setExerciseName(e.currentTarget.value);
    setDisableCompleteSetButton(false);
  };

  const repsChangeHandler = (e) => {
    setReps(e.currentTarget.value);
  };

  const weightChangeHandler = (e) => {
    setWeight(e.currentTarget.value);
  };

  const notesChangeHandler = (e) => {
    setNotes(e.currentTarget.value);
  };

  const onCompleteSetClicked = (e) => {
    e.preventDefault();
    const exerciseInfo = {
      name: exerciseName,
      reps,
      weight,
      notes
    };
    dispatch(setExercise(exerciseInfo));
    setDisableNextExerciseButton(false);
    setShowCurrentExerciseTable(true);
    setShowExerciseNameInput(false);
  };

  const onNextExerciseClicked = (e) => {
    e.preventDefault();
    const exerciseInfo = workout.currentExercise;
    dispatch(saveExercise(exerciseInfo));
    setShowCurrentExerciseTable(false);
    setShowExerciseNameInput(true);
    setExerciseName('');
    setReps(0);
    setWeight(0);
    setNotes('');
    dispatch(clearExercise());
    setDisableCompleteSetButton(true);
    setDisableNextExerciseButton(true);
  };

  const renderPreviousExercises = workout.previousExercises.map(
    (exercise, i) => {
      return <ExerciseTable key={i} exercise={exercise} />;
    }
  );

  const onDeleteClicked = (index) => {
    dispatch(deleteSet(index));
    if (workout.currentExercise.info.length < 2) {
      dispatch(clearExercise());
      setShowCurrentExerciseTable(false);
      setShowExerciseNameInput(true);
      setDisableCompleteSetButton(true);
      setDisableNextExerciseButton(true);
      setExerciseName('');
      setReps(0);
      setWeight(0);
      setNotes('');
    }
  };

  const submitWorkout = () => {
    let exercises = workout.previousExercises;
    dispatch(saveWorkout(exercises)).then((response) => {
      if (response.payload.success) {
        alert(`${response.payload.msg}`);
        setMsg(response.payload.msg);
        setAlertVisible(true);
        dispatch(clearExercise());
        setShowCurrentExerciseTable(false);
        setShowExerciseNameInput(true);
        setDisableCompleteSetButton(true);
        setDisableNextExerciseButton(true);
        window.location.reload(true);
      }
    });
  };

  const onDismiss = () => setAlertVisible(false);

  return (
    <div style={{ position: 'sticky', top: '24px', paddingBottom: '24px' }}>
      <h1>Log Your Gainz!</h1>
      <hr />
      <br />
      {showCurrentExerciseTable ? (
        <ExerciseTable
          exercise={workout.currentExercise}
          style
          edit
          delete={onDeleteClicked}
        />
      ) : null}

      <Form style={{ marginBottom: '48px' }}>
        {showExerciseNameInput ? (
          <FormGroup>
            <Label for='exerciseName'>Exercise Name (Required)</Label>
            <Input
              type='text'
              name='exerciseName'
              id='exerciseName'
              value={exerciseName}
              onChange={exerciseNameChangeHandler}
            />
          </FormGroup>
        ) : null}

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <FormGroup>
            <Label for='reps'>Reps</Label>
            <Input
              type='number'
              name='reps'
              id='reps'
              placeholder='0'
              value={reps}
              onChange={repsChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for='weight'>Weight</Label>
            <Input
              type='number'
              name='weight'
              id='weight'
              placeholder='0'
              value={weight}
              onChange={weightChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for='notes'>Notes</Label>
            <Input
              type='text'
              name='notes'
              id='notes'
              placeholder='add a note'
              value={notes}
              onChange={notesChangeHandler}
            />
          </FormGroup>
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <Button
            color='primary'
            onClick={onCompleteSetClicked}
            disabled={disableCompleteSetButton}>
            Complete Set
          </Button>
          <Button
            color='info'
            onClick={onNextExerciseClicked}
            disabled={disableNextExerciseButton}>
            Next Exercise
          </Button>
        </div>
        <br />
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '12px',
            flexDirection: 'column'
          }}>
          <Button
            color='danger'
            size='lg'
            block
            disabled={workout.previousExercises.length > 0 ? false : true}
            onClick={submitWorkout}>
            Save Workout
          </Button>
          <Alert color='success' isOpen={alertVisible} toggle={onDismiss}>
            {msg}
          </Alert>
        </div>
      </Form>
      <div>{renderPreviousExercises}</div>
    </div>
  );
};

export default InputLogs;
