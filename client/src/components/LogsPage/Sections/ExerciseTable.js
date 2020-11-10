import React from 'react';
import { Table, Button } from 'reactstrap';

const ExerciseTable = (props) => {
  const tableBody = props.exercise.info.map((data, index) => {
    return (
      <tr key={index}>
        <th scope='row'>{index + 1}</th>
        <td>{data.reps}</td>
        <td>{data.weight}</td>
        <td>{data.notes}</td>
        {props.edit && (
          <td>
            <Button color='danger' onClick={() => props.delete(index)}>
              &#10005;
            </Button>
          </td>
        )}
      </tr>
    );
  });

  return (
    <div style={{ marginBottom: '48px' }}>
      {props.exercise.name ? (
        <>
          <h3>{props.exercise.name}</h3>
          <Table dark={props.style ? true : false}>
            <thead>
              <tr>
                <th>Set</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </Table>
        </>
      ) : null}
    </div>
  );
};

export default ExerciseTable;
