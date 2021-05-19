import { Button, Container, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fileIcon from '../assets/fileIconWhite.png';
import * as action from '../redux/fileRedux/fileAction';
import { RootState } from '../redux/rootReducer';
import Dropzone from './Dropzone';

interface StateProps {
  file: File;
  loading: boolean;
  encryption_key: string;
  decrypting: boolean;
  decrypted_file: File;
  encrypted_lang: number;
}

interface DispatchProps {
  getFile: (id: string) => any;
  decryptFile: (file: File, key: string) => void;
  encryptFile: (file: File) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const AppContent = (props: Props) => {
  const [view, setView] = useState('');
  const [key, setKey] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (props.decrypted_file) {
      const element = document.createElement('a');
      element.href = URL.createObjectURL(props.decrypted_file);
      element.download = props.decrypted_file.name;
      document.body.appendChild(element);
      element.click();
      console.log(props.decrypted_file.name);
    }
  }, [props.decrypted_file]);

  const decryptButtonHandler = () => {
    if (props.file) {
      //props.decryptFile(props.file);
      setView('decrypt');
    } else {
      console.log('Please chose a file');
      alert('Please choose a file');
    }
  };

  // const decryptButtonHandler = () => {
  //   setView('get-file');
  // };

  const getFileHandler = () => {
    if (id !== '') {
      console.log(id);
      props.getFile(id);
    } else {
      console.log('Please enter a id');
      alert('Please enter a id');
    }
  };

  const decryptFileHandler = () => {
    if (key !== '') {
      console.log(key);
      props.decryptFile(props.file, key);
    } else {
      console.log('Please enter a key');
      alert('Please enter a key');
    }
  };

  const encryptButtonHandler = () => {
    if (props.file) {
      //props.decryptFile(props.file);
      props.encryptFile(props.file);
      setView('encrypt');
    } else {
      console.log('Please chose a file');
      alert('Please choose a file');
    }
  };

  return (
    <Container>
      <StyledTitle>
        {props.encrypted_lang ? '`4!!(3=s 4+3' : 'Cubbit Vault'}
      </StyledTitle>
      {view === '' && (
        <>
          <StyeldDescription>
            {props.encrypted_lang
              ? '^#5 -"$#=.-+(-$=%(+$=$-"18/3(.-= -#=#$"18/3(.-K=p$"41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 "8>'
              : 'Advanced online file encryption and decryption. Secure any file type and maintain your privacy!'}
          </StyeldDescription>
          <div className='file-drop-area'>
            <Dropzone />
          </div>
          <div className='button-area'>
            <Grid container>
              <Grid item xs={12}>
                <Button
                  className='light-btn'
                  color='secondary'
                  onClick={encryptButtonHandler}
                >
                  Encrypt
                </Button>
                <Button
                  className='dark-btn'
                  color='secondary'
                  onClick={decryptButtonHandler}
                >
                  Decrypt
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      {(view === 'decrypt' ||
        view === 'get-file' ||
        (view === 'encrypt' && props.loading === false)) && (
        <>
          <Grid container className='decrypt-container'>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6}>
              {view !== 'get-file' && (
                <div className='file-area'>
                  <Grid container>
                    <Grid item xs={5} />
                    <Grid item xs={2}>
                      <img src={fileIcon} alt='File Icon' />
                    </Grid>
                    <Grid item xs={5} />
                  </Grid>
                  <span style={{ display: 'block', height: '20px' }} />
                  <Grid container>
                    <Grid item xs={1} md={5} />
                    <Grid item xs={10} md={2}>
                      {props.file ? props.file.name : 'example.txt'}
                    </Grid>
                    <Grid item xs={1} md={5} />
                  </Grid>
                </div>
              )}
              <div className='key-container'>
                {view === 'encrypt' && <p> Your Encryption Key: </p>}
                {view === 'get-file' && <p> Insert your file id: </p>}
                {view === 'decrypt' && <p> Insert your key: </p>}
                <span style={{ display: 'block', height: '10px' }} />
                {view === 'encrypt' && (
                  <TextField
                    id='key'
                    fullWidth={true}
                    disabled={true}
                    value={props.encryption_key}
                  />
                )}
                {view === 'get-file' && (
                  <TextField
                    id='key'
                    fullWidth={true}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                )}
                {view === 'decrypt' && (
                  <TextField
                    id='key'
                    fullWidth={true}
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder='Insert encryption key'
                  />
                )}
                <span style={{ display: 'block', height: '30px' }} />
                {view === 'encrypt' && (
                  <Button>
                    <a
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      href={window.URL.createObjectURL(props.file)}
                      download={props.file.name}
                    >
                      Download
                    </a>
                  </Button>
                )}
                {view === 'get-file' && (
                  <Button onClick={getFileHandler}>Get File</Button>
                )}
                {view === 'decrypt' && (
                  <Button onClick={decryptFileHandler}>
                    {/*                        <a style={{textDecoration: 'none', color: 'inherit'}} href={window.URL.createObjectURL(props.file)} download={props.file.name}>
                          Decrypt and Download
                        </a>
                        */}
                    Decrypt and Download
                  </Button>
                )}
              </div>
            </Grid>
            <Grid item xs={1} md={3} />
          </Grid>
          <span style={{ display: 'block', height: '40px' }} />
        </>
      )}
    </Container>
  );
};

const StyledTitle = styled.div`
  margin-top: 7%;
  font-size: 36px;
  font-weight: 900;
  font-size: 36px;
  line-height: 47px;
`;

const StyeldDescription = styled.div`
  margin-top: 20px;
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  margin-bottom: 20px;
`;

const mapStateToProps = (state: RootState) => {
  console.log(state);
  return {
    file: state.fileReducer.file,
    loading: state.fileReducer.loading,
    encryption_key: state.fileReducer.key,
    decrypting: state.fileReducer.decrypting,
    decrypted_file: state.fileReducer.decrypted_file,
    encrypted_lang: state.fileReducer.encrypted_lang,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getFile: (id: string) => dispatch(action.getFile(id)),
    decryptFile: (file: File, key: string) =>
      dispatch(action.decryptFile(file, key)),
    encryptFile: (file: File) => dispatch(action.encryptFile(file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);
