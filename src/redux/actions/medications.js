import {
  ADD_MEDICATION,
  UPDATE_MEDICATION,
  DELETE_MEDICATION
} from "../types/medications";

import { DELETE_NOTIFICATIONS } from "../types/notifications";

export const addMedication = medication => {
  return dispatch => {
    dispatch({
      type: ADD_MEDICATION,
      medication
    });
  };
};

export const updateMedication = medication => {
  return dispatch => {
    dispatch({
      type: UPDATE_MEDICATION,
      medication
    });
  };
};

export const deleteMedication = m_id => {
  return dispatch => {
    dispatch({
      type: DELETE_NOTIFICATIONS,
      m_id
    });
    dispatch({
      type: DELETE_MEDICATION,
      m_id
    });
  };
};
