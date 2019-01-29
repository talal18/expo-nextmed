import {
  DELETE_MEDICATION,
  UPDATE_MEDICATION,
  ADD_MEDICATION,
  RESET_MEDICATIONS
} from "../types/medications";
import { DELETE_NOTIFICATION } from "../types/notifications";

export const deleteMedication = item => {
  return dispatch => {
    dispatch({
      type: DELETE_NOTIFICATION,
      m_id: item.m_id
    });
    dispatch({
      type: DELETE_MEDICATION,
      medication: item
    });
  };
};

export const addMedication = data => {
  return dispatch => {
    dispatch({
      type: ADD_MEDICATION,
      medication: data
    });
  };
};

export const updateMedication = item => {
  return dispatch => {
    dispatch({
      type: UPDATE_MEDICATION,
      medication: item
    });
  };
};

export const reset_medications = () => {
  return dispatch => {
    dispatch({
      type: RESET_MEDICATIONS
    });
  };
};
