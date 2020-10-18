import _ from 'lodash';
import React, { useState } from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import Picker from '../Picker';
import Upload from '../Upload';
import './styles.css';

const Entrance: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [allowUpload, setAllowUpload] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const [success, setSuccess] = useState<JSX.Element | null>();
  const ALERT_TIMEOUT = 5000;

  function handleSuccessAlert(elm: JSX.Element): void {
    setSuccess(elm);
    setInterval(() => setSuccess(null), ALERT_TIMEOUT);
  }

  function handleErrorAlert(err: string): void {
    setErr(err);
    setInterval(() => setErr(''), ALERT_TIMEOUT);
  }

  return (
    <Container fluid>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <Card>
            <Card.Header>Uploadr <span className='copyright'>©</span></Card.Header>
            <Card.Body>
              <Card.Title>Please choose a file then click Upload</Card.Title>
              {!_.isEmpty(err) && <Alert variant='danger'>{err}</Alert>}
              {!_.isEmpty(success) && <Alert variant='success'>{success}</Alert>}
              <div className='upload-row'>
                <Upload 
                  file={file} 
                  allowUpload={allowUpload} 
                  handleSuccessAlert={handleSuccessAlert} 
                  handleErrorAlert={handleErrorAlert}/>
                <Picker 
                  setAllowUpload={setAllowUpload}
                  file={file}
                  setFile={setFile}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Entrance;
