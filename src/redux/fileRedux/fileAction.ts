import axios from 'axios';
import crypto from 'crypto';
import { decrypt, encrypt } from '../../utils/encrypt';
import { actionTypes } from './fileActionTypes';

export const switchLanguage = (lang: string) => ({
  type: actionTypes.SWITCH_LANGUAGE,
  lang: lang,
});

export const requestToUploadFile = () => ({
  type: actionTypes.REQ_TO_UPLOAD_FILE,
});

export const fileUploadSuccess = (file: File) => ({
  type: actionTypes.FILE_UPLOAD_SUCCESS,
  file: file,
});

export const fileUploadFailure = () => ({
  type: actionTypes.FILE_UPLOAD_FAILURE,
});

export const uploadFile = (file: File) => (dispatch) => {
  dispatch(requestToUploadFile());
  //get file contents
  dispatch(fileUploadSuccess(file));
  //If errors encountered:
  // fileUploadFailure();
};

export const requestToEncrypt = () => ({
  type: actionTypes.REQ_TO_ENCRYPT,
});

export const encryptSuccess = (file: File, key: string) => ({
  type: actionTypes.ENCRYPT_SUCCESS,
  file: file,
  key: key,
});

export const encryptFailure = () => ({
  type: actionTypes.ENCRYPT_FAILURE,
});

export const encryptFile = (file: File) => (dispatch) => {
  dispatch(requestToEncrypt());
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = async (e: ProgressEvent<FileReader> | null) => {
    var data;
    if (e && e.target) {
      data = e.target.result;
    }
    var key_bytes = crypto.randomBytes(32);
    var key1: string[] = [];
    key_bytes.forEach((byte) => {
      key1.push(scaleKeyBytes(byte));
    });
    const key = key1.join('');
    // var key = 'fullstack';

    const encrypted_data = encrypt(data, key);
    //const encrypted_data = "hello world";
    const encrypted_file = new File([encrypted_data], 'encrypted' + file.name, {
      type: 'text/plain',
    });

    const formData = new FormData();

    formData.append('key', key);
    formData.append('file', encrypted_file, 'encrypted' + file.name);

    try {
      const res = await axios.post('http://localhost:3000/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    dispatch(encryptSuccess(encrypted_file, key));
    if (e && e.target) {
      return e.target.result;
    }
  };
  //function to encrypt
  //if error
  //dispatch(encryptFailure());
  reader.onerror = (e) => {
    dispatch(encryptFailure());
  };
};

export const requestToGetFile = () => ({
  type: actionTypes.REQ_TO_GET_FILE,
});

export const requestToDecrypt = () => ({
  type: actionTypes.REQ_TO_DECRYPT,
});

export const decryptSuccess = (file: File) => ({
  type: actionTypes.DECRYPT_SUCCESS,
  decrypted_file: file,
});

export const decryptFailure = () => ({
  type: actionTypes.DECRYPT_FAILURE,
});

export const getFile = (id: string) => async (dispatch) => {
  console.log(id);
  dispatch(requestToGetFile());

  try {
    const res = await axios({
      url: `http://localhost:3000/files/${id}`,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    console.log(res.data);
    const key = 'fullstack';
    console.log(key);
    const reader = new FileReader();

    reader.readAsText(new Blob([res.data]));
    reader.onload = (e) => {
      console.log(e);
      var data;
      if (e && e.target) data = e.target.result;
      //const key = "frontend"; // get random key
      const decrypted_data = decrypt(data, key);
      //const encrypted_data = "hello world";
      const decrypted_file = new File([decrypted_data], 'encryptedtest.txt', {
        type: 'text/plain',
      });
      dispatch(decryptSuccess(decrypted_file));
      if (e && e.target) return e.target.result;
    };

    // reader.onerror = (e) => {
    //   dispatch(decryptFailure());
    // };
  } catch (error) {
    console.log(error);
  }
};
export const decryptFile = (file: File, key: string) => (dispatch) => {
  console.log(key);
  dispatch(requestToDecrypt());
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (e) => {
    var data;
    if (e && e.target) data = e.target.result;
    //const key = "frontend"; // get random key
    const decrypted_data = decrypt(data, key);
    //const encrypted_data = "hello world";
    const decrypted_file = new File([decrypted_data], 'decrypted' + file.name, {
      type: 'text/plain',
    });
    dispatch(decryptSuccess(decrypted_file));
    if (e && e.target) return e.target.result;
  };

  reader.onerror = (e) => {
    dispatch(decryptFailure());
  };
};

function scaleKeyBytes(val: number) {
  var mod = val % 94;
  return String.fromCharCode(32 + mod);
}
