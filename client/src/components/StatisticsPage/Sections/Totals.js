import React from 'react';
import { Table } from 'reactstrap';

const Totals = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Lifting Totals</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>Total sets: 499</th>
        </tr>
        <tr>
          <th scope='row'>Total reps: 2609</th>
        </tr>
        <tr>
          <th scope='row'>Total weight moved: 249540.00 lbs</th>
        </tr>
      </tbody>
    </Table>
  );
};

export default Totals;
