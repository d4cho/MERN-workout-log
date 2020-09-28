import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import InputLogs from './Sections/InputLogs';
import LogDetails from './Sections/LogDetails';

const LogsPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <InputLogs />
        </Col>
        <Col>
          <LogDetails />
        </Col>
      </Row>
    </Container>
  );
};

export default LogsPage;
