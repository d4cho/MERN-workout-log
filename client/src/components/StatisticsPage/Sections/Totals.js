import React from 'react';
import { Table } from 'reactstrap';

const Totals = (props) => {
  let totalSets = 0;
  let totalReps = 0;
  let totalWeightMoved = 0;

  // calculate total number of sets
  const arrayOfSets = props.exerciseStats.map((workout) => workout.info.length);
  if (arrayOfSets.length > 0) {
    totalSets = arrayOfSets.reduce((acc, curr) => acc + curr);
  }

  //calculate total number of reps
  let totalRepsArray = [];
  for (const workout of props.exerciseStats) {
    workout.info.forEach((set) => {
      totalRepsArray.push(parseInt(set.reps));
    });
  }
  if (totalRepsArray.length > 0) {
    totalReps = totalRepsArray.reduce((acc, curr) => acc + curr);
  }

  //calculate total weight moved
  let totalWeightMovedArray = [];
  for (const workout of props.exerciseStats) {
    workout.info.forEach((set) => {
      totalWeightMovedArray.push(parseInt(set.reps) * parseInt(set.weight));
    });
  }
  if (totalWeightMovedArray.length > 0) {
    totalWeightMoved = totalWeightMovedArray.reduce((acc, curr) => acc + curr);
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Lifting Totals</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>Total sets: {totalSets}</th>
        </tr>
        <tr>
          <th scope='row'>Total reps: {totalReps}</th>
        </tr>
        <tr>
          <th scope='row'>Total weight moved: {totalWeightMoved} lbs</th>
        </tr>
      </tbody>
    </Table>
  );
};

export default Totals;
