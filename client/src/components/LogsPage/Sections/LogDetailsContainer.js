import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

import PulseLoader from 'react-spinners/PulseLoader';
import LogDetails from './LogDetails';
import { AiOutlineLineChart } from 'react-icons/ai';

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
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h1>Gainz History</h1>
        <Button color='primary' size='lg'>
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            href='/mylogs/statistics'>
            <AiOutlineLineChart style={{ fontSize: '32px' }} /> &nbsp;
            Statistics
          </a>
        </Button>
      </div>
      <hr />
      <br />
      {isLoading ? <PulseLoader size={25} color={'#0000FF'} /> : renderLogs}
    </div>
  );
};

export default LogDetailsContainer;
