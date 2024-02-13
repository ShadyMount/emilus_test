import {
  CLIENTS_LOADING,
  CLIENTS_LOADING_ERROR,
  CLIENTS_LOADING_SUCCESS,
  SET_SELECTED_CLIENT,
  UPDATE_SELECTED_CLIENT,
} from "redux/constants/Clients";

export const requstClients = () => {
  return {
    type: CLIENTS_LOADING,
  };
};

export const requestClientsCompleted = (data) => {
  return {
    type: CLIENTS_LOADING_SUCCESS,
    payload: data,
  };
};

export const requestClientsError = (data) => {
  return {
    type: CLIENTS_LOADING_ERROR,
    payload: data,
  };
};

export const setSelectedClient = (data) => {
  return {
    type: SET_SELECTED_CLIENT,
    payload: data,
  };
};

export const updateSelectedClient = () => {
  return {
    type: UPDATE_SELECTED_CLIENT,
  };
};
