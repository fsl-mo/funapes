import { uiTypes } from './types';

export const loadingUI = () => ({ type: uiTypes.LOADING_UI });

export const clearError = errType => ({
  type: uiTypes.CLEAR_ERROR,
  payload: errType,
});

export const clearErrors = () => ({ type: uiTypes.CLEAR_ERRORS });

export const setErrors = errors => ({
  type: uiTypes.SET_ERRORS,
  payload: errors,
});
