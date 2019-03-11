import {
  SET_TITLE,
  SET_TYPE,
  RESET_DATA,
  SET_RECURRENCE,
  SET_DOSAGE,
  SET_NOTES,
  ADD_TIME,
  DELETE_TIME,
  SET_START_DATE,
  SET_END_DATE,
  SET_M_ID,
  SET_IMAGE_URI
} from "../types/data";

export const set_image_uri = uri => {
  return dispatch => {
    dispatch({
      type: SET_IMAGE_URI,
      uri
    });
  };
};

export const set_m_id = m_id => {
  return dispatch => {
    dispatch({
      type: SET_M_ID,
      m_id
    });
  };
};

export const set_title = title => {
  return dispatch => {
    dispatch({
      type: SET_TITLE,
      title
    });
  };
};

export const set_type = medType => {
  return dispatch => {
    dispatch({
      type: SET_TYPE,
      medType
    });
  };
};

export const set_dosage = dosage => {
  return dispatch => {
    dispatch({
      type: SET_DOSAGE,
      dosage
    });
  };
};

export const set_recurrence = recurrence => {
  return dispatch => {
    dispatch({
      type: SET_RECURRENCE,
      recurrence
    });
  };
};

export const add_time = time => {
  return dispatch => {
    dispatch({
      type: ADD_TIME,
      time
    });
  };
};

export const delete_time = time => {
  return dispatch => {
    dispatch({
      type: DELETE_TIME,
      time
    });
  };
};

export const set_start_date = start_date => {
  return dispatch => {
    dispatch({
      type: SET_START_DATE,
      start_date
    });
  };
};

export const set_end_date = end_date => {
  return dispatch => {
    dispatch({
      type: SET_END_DATE,
      end_date
    });
  };
};

export const set_notes = notes => {
  return dispatch => {
    dispatch({
      type: SET_NOTES,
      notes
    });
  };
};

export const reset_data = () => {
  return dispatch => {
    dispatch({
      type: RESET_DATA
    });
  };
};
