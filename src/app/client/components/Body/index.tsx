import _ from 'lodash';
import React, { useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import Picker from '../Picker';
import Upload from '../Upload';
import './styles.css';

const Entrance: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [allowUpload, setAllowUpload] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const ALERT_TIMEOUT = 5000;

  function handleSetAlert(msg: string, setter: (msg: string) => void): void {
    setter(msg);
    setInterval(() => setter(''), ALERT_TIMEOUT);
  }

  return (
    <Card className='main-container'>
      <Card.Header>Uploadr</Card.Header>
      <Card.Body>
        <Card.Title>Please choose a file then click Upload</Card.Title>
        {!_.isEmpty(err) && <Alert variant='danger'>{err}</Alert>}
        {!_.isEmpty(success) && <Alert variant='success'>{success}</Alert>}
        <Picker 
          setAllowUpload={setAllowUpload}
          file={file}
          setFile={setFile}
        />
        <Upload 
          file={file} 
          allowUpload={allowUpload} 
          handleSuccessAlert={(msg: string) => handleSetAlert(msg, setSuccess)} 
          handleErrorAlert={(msg: string) => handleSetAlert(msg, setErr)}/>
      </Card.Body>
    </Card>
  );
};

export default Entrance;
