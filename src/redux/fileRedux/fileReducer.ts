import { actionTypes } from './fileActionTypes';
interface IState {
  file?: File | null;
  encrypted_lang?: number;
  loading?: boolean;
  error?: string;
  decrypted_file?: File | null;
  decrypting?: boolean;
  decryption_error?: string;
  key?: string;
}

const initialState: IState = {
  file: null,
  encrypted_lang: 0,
  loading: false,
};

const fileReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_LANGUAGE:
      console.log(action.lang);
      return {
        ...state,
        encrypted_lang: action.lang,
      };
    case actionTypes.REQ_TO_ENCRYPT:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ENCRYPT_SUCCESS:
      return {
        ...state,
        file: action.file,
        key: action.key,
        loading: false,
      };
    case actionTypes.ENCRYPT_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Encryption error',
      };
    case actionTypes.REQ_TO_UPLOAD_FILE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        file: action.file,
        loading: false,
      };
    case actionTypes.FILE_UPLOAD_FAILURE:
      return {
        ...state,
        loading: true,
        error: 'Error uplaoding file',
      };
    case actionTypes.REQ_TO_GET_FILE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.REQ_TO_DECRYPT:
      return {
        ...state,
        decrypting: true,
      };

    case actionTypes.DECRYPT_SUCCESS:
      return {
        ...state,
        decrypting: false,
        decrypted_file: action.decrypted_file,
      };
    case actionTypes.DECRYPT_FAILURE:
      return {
        ...state,
        decrypting: false,
        decryption_error: 'Error',
      };
    default:
      return state;
  }
};

export default fileReducer;
