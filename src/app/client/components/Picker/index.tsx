import bsCustomFileInput from 'bs-custom-file-input';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './styles.css';

const Picker: React.FC<Props> = ({setAllowUpload, file, setFile}: Props) => {
  useEffect(() => {
    bsCustomFileInput.init();
  });

  function handleFileSelect(e: any): void {
    setFile(e.target.files[0]);
    setAllowUpload(true);
  }

  return (
    <Form className='picker'>
      <Form.File
        type='file'
        id='file'
        label={!_.isNil(file) ? file.name : 'No file selected'}
        onChange={handleFileSelect}
        data-browse='Choose File'
        custom
      />
    </Form>
  );
};

type Props = {
    setAllowUpload: (allow: boolean) => void,
    file?: File,
    setFile: (file: File) => void
}

export default Picker;
