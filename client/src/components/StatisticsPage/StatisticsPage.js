import React from 'react';

import Chart from './Sections/Chart';
import PersonalRecords from './Sections/PersonalRecords';
import Totals from './Sections/Totals';

const StatisticsPage = () => {
  return (
    <div>
      <Chart />
      <br />
      <PersonalRecords />
      <br />
      <Totals />
    </div>
  );
};

export default StatisticsPage;
