import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Upload from 'app/client/components/Upload';
import React from 'react';
import { getMockFile } from '../utils';

const mockUploadApi = jest.requireActual('app/client/api/upload');

describe('<Upload />', () => {
  it('renders', () => {
    // given
    const { getByText } = render(<Upload allowUpload={false} handleSuccessAlert={jest.fn()} handleErrorAlert={jest.fn()}/>);

    // then
    expect(getByText('Upload')).toBeDisabled();
  });

  it('sets an error when uploading null file', () => {
    // given
    const handleErrorAlertFn = jest.fn();
    const { getByText } = render(<Upload allowUpload={true} handleSuccessAlert={jest.fn()} handleErrorAlert={handleErrorAlertFn}/>);
    mockUploadApi.uploadFile = jest.fn();

    // when
    fireEvent.click(getByText('Upload'));

    // then
    expect(handleErrorAlertFn).toHaveBeenCalledWith('No file selected');
    expect(mockUploadApi.uploadFile).not.toHaveBeenCalled();
  });

  it('sets an error when file upload fails', async() => {
    // given
    const handleErrorAlertFn = jest.fn();
    const { getByText } = render(<Upload allowUpload={true} handleSuccessAlert={jest.fn()} handleErrorAlert={handleErrorAlertFn} file={getMockFile() as File}/>);

    const failText = 'Unable to upload doc';
    mockUploadApi.uploadFile = jest.fn().mockRejectedValue({response: {text: failText}});

    // when
    fireEvent.click(getByText('Upload'));

    // then
    expect(mockUploadApi.uploadFile).toHaveBeenCalled();
    await waitFor(() =>expect(handleErrorAlertFn).toHaveBeenCalled());
  });

  it('shows a spinner while loading', async () => {
    // given
    const handleSuccessAlertFn = jest.fn();
    const { getByText, getByRole, queryByRole } = render(<Upload allowUpload={true} handleSuccessAlert={handleSuccessAlertFn} handleErrorAlert={jest.fn()} file={getMockFile() as File}/>);
    mockUploadApi.uploadFile = jest.fn().mockResolvedValue({url: 'testUrl'});

    // when
    fireEvent.click(getByText('Upload'));

    // then
    expect(getByRole('status')).toBeTruthy();
    await waitFor(() => expect(handleSuccessAlertFn).toHaveBeenCalled());
    expect(queryByRole('status')).toBeFalsy();
  });

});