import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { uploadFile } from '../../api/upload';

const Upload: React.FC<Props> = ({file, allowUpload, handleSuccessAlert, handleErrorAlert}: Props) => {
  const [uploading, setUploading] = useState<boolean>(false);

  function handleUpload(): void {
    if (_.isNil(file)) {
      handleErrorAlert('No file selected');
      return;
    }

    setUploading(true);
    uploadFile(file.name, file)
      .then(() => {
        handleSuccessAlert( `${file.name} uploaded successfully!`);
      })
      .catch((err: any) => {
        handleErrorAlert(err.response.text);
      })
      .finally(() => {
        setUploading(false);
      }); 
  }

  return (
    <Button disabled={!allowUpload || uploading} onClick={handleUpload}>
      {uploading &&
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
      }
      Upload
    </Button>
  );
};

type Props = {
    file?: File,
    allowUpload: boolean,
    handleSuccessAlert: (msg: string) => void,
    handleErrorAlert: (msg: string) => void
}

export default Upload;
