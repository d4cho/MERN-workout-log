import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PulseLoader from 'react-spinners/PulseLoader';
import LogDetails from './LogDetails';

const LogDetailsContainer = (props) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/workouts/getLogs').then((response) => {
      if (response.data.success) {
        console.log(response.data.workouts);
        setLogs(response.data.workouts);
        setIsLoading(false);
      } else {
        alert('Login to view your logs');
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
      {isLoading ? <PulseLoader size={25} color={'#0000FF'} /> : renderLogs}
    </div>
  );
};

export default LogDetailsContainer;
