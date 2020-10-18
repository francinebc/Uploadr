import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './Entrance.css';
import bsCustomFileInput from 'bs-custom-file-input';
import { uploadFile } from '../api/upload';

const Entrance: React.FC = () => {
  const [fileName, setFileName] = useState('No file selected');
  const [file, setFile] = useState<File>();

  useEffect(() => {
    bsCustomFileInput.init();
  });

  function handleFileSelect(e: any): void {
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(JSON.stringify(e.target.files[0]));
  }

  function handleUpload(): void {
    console.log('uploading...');
    uploadFile(fileName, file);
  }

  return (
    <Card className='main-container'>
      <Card.Header>Uploadr</Card.Header>
      <Card.Body>
        <Card.Title>Please choose a file then click Upload</Card.Title>
        <Form>
          <Form.File
            type='file'
            id='file'
            label={fileName}
            onChange={handleFileSelect}
            data-browse='Choose File'
            custom
          />
        </Form>
        <Button onClick={handleUpload}>Upload</Button>
      </Card.Body>
    </Card>
  );
};

export default Entrance;
