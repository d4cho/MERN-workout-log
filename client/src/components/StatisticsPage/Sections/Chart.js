import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import moment from 'moment';

const REP_MAX_MULTIPLIER = [
  { rep: '1', multiplier: 1.0 },
  { rep: '2', multiplier: 1.05 },
  { rep: '3', multiplier: 1.08 },
  { rep: '4', multiplier: 1.11 },
  { rep: '5', multiplier: 1.15 },
  { rep: '6', multiplier: 1.18 },
  { rep: '7', multiplier: 1.2 },
  { rep: '8', multiplier: 1.25 },
  { rep: '9', multiplier: 1.3 },
  { rep: '10', multiplier: 1.33 },
  { rep: '11', multiplier: 1.43 },
  { rep: '12', multiplier: 1.49 },
  { rep: '15', multiplier: 1.54 }
];

const Chart = (props) => {
  let data = [];

  const repMaxCalculator = (rep, weight) => {
    let oneRepMax = 0;
    let multiplier = 1;
    for (const element of REP_MAX_MULTIPLIER) {
      if (element.rep === rep) {
        multiplier = element.multiplier;
      }
    }

    oneRepMax = (parseInt(weight) * multiplier).toFixed(2);
    return oneRepMax;
  };

  for (const session of props.exerciseStats) {
    for (const set of session.info) {
      data.push({
        date: moment(session.date).format('DD-MMM-YYYY'),
        Estimated1RM: repMaxCalculator(set.reps, set.weight),
        PerformedWeight: set.weight,
        Reps: set.reps
      });
    }
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{
            top: 80,
            right: 0,
            bottom: 20,
            left: 0
          }}>
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis
            dataKey='date'
            label={{ value: '', position: 'insideBottom', offset: 0 }}
          />
          <YAxis
            label={{ value: 'Weight', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey='Reps' barSize={20} fill='#413ea0' />
          <Line type='linear' dataKey='PerformedWeight' stroke='#413ea0' />
          <Line type='monotone' dataKey='Estimated1RM' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
