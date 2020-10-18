import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import './Entrance.css';
import bsCustomFileInput from 'bs-custom-file-input';
import { uploadFile } from '../api/upload';
import _ from 'lodash';

const Entrance: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [allowUpload, setAllowUpload] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const ALERT_TIMEOUT = 5000;

  useEffect(() => {
    bsCustomFileInput.init();
  });

  function handleFileSelect(e: any): void {
    setFile(e.target.files[0]);
    setAllowUpload(true);
  }

  function handleUpload(): void {
    if (_.isNil(file)) {
      handleSetAlert('No file selected', setErr);
      return;
    }

    setUploading(true);
    uploadFile(file.name, file)
      .then(() => {
        handleSetAlert( `${file.name} uploaded successfully!`, setSuccess);
      })
      .catch((err: any) => {
        handleSetAlert(err.response.text, setErr);
      })
      .finally(() => {
        setUploading(false);
      }); 
  }

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
        <Form>
          <Form.File
            type='file'
            id='file'
            label={!_.isNil(file) ? file.name : 'No file selected'}
            onChange={handleFileSelect}
            data-browse='Choose File'
            custom
          />
        </Form>
        <Button disabled={!allowUpload || uploading} onClick={handleUpload}>
          {uploading &&
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          }
          Upload
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Entrance;
