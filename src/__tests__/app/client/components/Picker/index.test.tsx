import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Picker from 'app/client/components/Picker';
import React from 'react';
import bsCustomFileInput from 'bs-custom-file-input';
import { getMockFile } from '../utils';

jest.mock('bs-custom-file-input');

describe('<Picker />', () => {
  it('renders', () => {
    // given
    const { getByText } = render(<Picker setAllowUpload={jest.fn()} setFile={jest.fn()}/>);

    // then
    expect(getByText('No file selected')).toBeInTheDocument();
  });

  it('inits bsCustomFileInput', () => {
    // given
    render(<Picker setAllowUpload={jest.fn()} setFile={jest.fn()}/>);

    // then
    expect(bsCustomFileInput.init).toHaveBeenCalled();
  });

  it('has the filename as the label', async () => {
    // given
    const file = getMockFile('testFile.txt');
    const { getByText } = render(<Picker setAllowUpload={jest.fn()} setFile={jest.fn()} file={file as File}/>);

    // then
    expect(getByText('testFile.txt')).toBeInTheDocument();
  });

  it('sets the file and the allow upload on file change', async () => {
    // given
    const setAllowUploadFn = jest.fn();
    const setFilefn = jest.fn();
    const { getByLabelText } = render(<Picker setAllowUpload={setAllowUploadFn} setFile={setFilefn}/>);
    const input = getByLabelText('No file selected');

    // when
    await fireEvent.change(input, {target: {files: [getMockFile()]}});

    // then
    expect(setAllowUploadFn).toHaveBeenCalledWith(true);
    expect(setFilefn).toHaveBeenCalled();
  });
});