import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LogDetails from './LogDetails';

const LogDetailsContainer = (props) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/workouts/getLogs').then((response) => {
      if (response.data.success) {
        console.log(response.data.workouts);
        setLogs(response.data.workouts);
      } else {
        alert('failed to get logs from the server');
      }
    });
  }, []);

  const renderLogs = logs.map((log) => (
    <div key={log._id} style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <LogDetails
          date={log.createdAt}
          exercises={log.exercises}
          id={log._id}
        />
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Gainz History</h1>
      <hr />
      <br />
      {renderLogs}
    </div>
  );
};

export default LogDetailsContainer;
