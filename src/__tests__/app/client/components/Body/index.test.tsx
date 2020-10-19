import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Body from 'app/client/components/Body';
import React from 'react';
import _ from 'lodash';
import { getMockFile } from '../utils';

const mockUploadApi = jest.requireActual('app/client/api/upload');

describe('<Body />', () => {
  it('renders', () => {
    // given
    const { getByText } = render(<Body />);
    const titleText = 'Please choose a file then click Upload';

    // then
    expect(getByText(titleText)).toBeInTheDocument();
  });

  it('shows the danger alert when error', async () => {
    // given
    const failText = 'Unable to upload doc';
    mockUploadApi.uploadFile = jest.fn().mockRejectedValue({response: {text: failText}});
    const { getByText, getByLabelText, getByRole } = render(<Body />);
    const input = getByLabelText('No file selected');

    // when
    await fireEvent.change(input, {target: {files: [getMockFile()]}});
    fireEvent.click(getByText('Upload'));

    // then
    await waitFor(() => expect(getByRole('alert')).toBeTruthy());
    expect(getByText(failText));
  });

  it('shows the success alert when file uploads successfully', async () => {
    // given
    const { getByText, getByLabelText, getByRole } = render(<Body />);
    mockUploadApi.uploadFile = jest.fn().mockResolvedValue({url: 'testUrl'});
    const input = getByLabelText('No file selected');

    // when
    await fireEvent.change(input, {target: {files: [getMockFile()]}});
    fireEvent.click(getByText('Upload'));

    // then
    await waitFor(() => expect(getByRole('alert')).toBeTruthy());
    expect(getByText((content: string, element: HTMLElement) => !_.isNil(element) && _.endsWith(content, 'uploaded successfully!')));
  });
});