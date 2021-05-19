import React, { DragEvent } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import dropDown from '../assets/dropDown.png';
import fileIcon from '../assets/fileIcon.png';
import fileIconLarge from '../assets/fileicon_black_orange.svg';
import * as action from '../redux/fileRedux/fileAction';
import { RootState } from '../redux/rootReducer';
import styled from 'styled-components';

interface StateProps {
  file: File;
  loading: boolean | undefined;
  encrypted_lang: number;
}

interface DispatchProps {
  uploadFile: (file: File) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const Dropzone = (props: Props) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  // // function to get file size of inp file
  // const fileSize = (size: number) => {
  //   if (size === 0) return '0 Bytes';
  //   const k = 1024;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  //   const i = Math.floor(Math.log(size) / Math.log(k));
  //   return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  // };

  // // function to get filetype of file
  // const fileType = (fileName: string) => {
  //   return (
  //     fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
  //     fileName
  //   );
  // };

  const handleFileOpen = () => {
    hiddenFileInput.current?.click();
  };

  // function to handle when file dragged over
  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // function to handle when file dragged inside droppable area
  const dragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // function to handle when dragged outside droppable area
  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // function to handle when file is dropped
  const fileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
      handleFiles(files);
    }
  };

  // function to work on files
  const handleFiles = (files: FileList) => {
    if (files.length !== 1) {
      console.log('Upload 1 file');
    }

    props.uploadFile(files[0]);
  };

  // function called when files uploaded manually
  const handleFilesUpload = (event: any) => {
    handleFiles(event.target.files);
  };

  return (
    <StyledContainer>
      <div
        className='drop-container'
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <input
          type='file'
          id='file'
          ref={hiddenFileInput}
          onChange={handleFilesUpload}
          style={{ display: 'none' }}
        />
        {!props.file && (
          <>
            <Grid
              container
              onClick={handleFileOpen}
              className='file-inp-container'
            >
              <Grid item xs={2} md={5} />
              <Grid item xs={8} md={2} className='file-inp'>
                <Grid container>
                  <Grid item xs={2}>
                    <img src={fileIcon} alt='File Icon' />
                  </Grid>
                  <Grid item xs={8}>
                    {props.encrypted_lang ? "`'..2$=%(+$>" : ' Choose file!'}
                  </Grid>
                  <Grid item xs={2}>
                    <img src={dropDown} alt='DropDown' />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} md={5} />
            </Grid>
            <div className='drop-message'>or drop files here</div>
          </>
        )}
        {props.file && (
          <>
            <img
              src={fileIconLarge}
              className='file-inp-container'
              alt='File INP Container'
            />
            <p className='drop-message'>{props.file.name}</p>
          </>
        )}
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  color: black;
  border: 1px dashed rgba(22, 22, 22, 0.16);
  background-color: #d9893f;
`;

const mapStateToProps = (state: RootState) => {
  console.log(state);
  return {
    file: state.fileReducer.file,
    loading: state.fileReducer.loading,
    encrypted_lang: state.fileReducer.encrypted_lang,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    uploadFile: (file: File) => dispatch(action.uploadFile(file)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dropzone);
