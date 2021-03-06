import React from 'react';
import { Table } from 'reactstrap';

const X_REP_MAX = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const PersonalRecords = (props) => {
  const repMaxCalculator = (rep, data) => {
    let max = 0;
    for (const session of data) {
      for (const set of session.info) {
        if (set.reps === rep && set.weight > max) {
          max = set.weight;
        }
      }
    }
    return max;
  };

  const renderTableBody = X_REP_MAX.map((rep) => (
    <tr key={rep}>
      <th scope='row'>{rep} Reps</th>
      <td>{repMaxCalculator(rep, props.exerciseStats)} lbs</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Personal Records</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{renderTableBody}</tbody>
    </Table>
  );
};

export default PersonalRecords;
