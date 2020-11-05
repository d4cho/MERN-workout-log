import React from 'react';
import { Table } from 'reactstrap';

const PersonalRecords = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Personal Records</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>1 Rep</th>
          <td>100.00 lbs</td>
        </tr>
        <tr>
          <th scope='row'>2 Reps</th>
          <td>90.00 lbs</td>
        </tr>
        <tr>
          <th scope='row'>3 Reps</th>
          <td>80.00 lbs</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PersonalRecords;
