import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { uploadFile, UploadResponse } from '../../api/upload';
import './styles.css';

const Upload: React.FC<Props> = ({file, allowUpload, handleSuccessAlert, handleErrorAlert}: Props) => {
  const [uploading, setUploading] = useState<boolean>(false);

  function handleUpload(): void {
    if (_.isNil(file)) {
      handleErrorAlert('No file selected');
      return;
    }

    setUploading(true);
    uploadFile(file.name, file)
      .then(({url}: UploadResponse) => {
        handleSuccessAlert(<span><a href={url}>{file.name}</a> uploaded successfully!</span>);
      })
      .catch((err: any) => {
        handleErrorAlert(err.response.text);
      })
      .finally(() => {
        setUploading(false);
      }); 
  }

  return (
    <Button disabled={!allowUpload || uploading} onClick={handleUpload} className='upload'>
      {uploading &&
          <><Spinner animation="border" role="status" size="sm">
            <span className="sr-only">Loading...</span>
          </Spinner>{' '}</>
      }
      Upload
    </Button>
  );
};

type Props = {
    file?: File,
    allowUpload: boolean,
    handleSuccessAlert: (elm: JSX.Element) => void,
    handleErrorAlert: (err: string) => void
}

export default Upload;
