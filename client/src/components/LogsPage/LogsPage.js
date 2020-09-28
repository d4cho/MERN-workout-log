import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import InputLogs from './Sections/InputLogs';
import LogDetailsContainer from './Sections/LogDetailsContainer';

const LogsPage = () => {
  return (
    <Container>
      <Row>
        <Col xs='auto'>
          <InputLogs />
        </Col>
        <Col xs='auto'>
          <LogDetailsContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default LogsPage;
