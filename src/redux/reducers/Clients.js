import {
  CLIENTS_LOADING,
  CLIENTS_LOADING_ERROR,
  CLIENTS_LOADING_SUCCESS,
  SET_SELECTED_CLIENT,
} from "../constants/Clients";

const initState = {
  loading: false,
  message: "",
  showMessage: false,
  clientsList: [],
  selectedClient: null,
};

const clients = (state = initState, action) => {
  switch (action.type) {
    case CLIENTS_LOADING_ERROR:
      return {
        ...state,
        loading: false,
        message: `Ошибка загрузки клиентов, ${action.payload}`,
        showMessage: true,
      };
    case CLIENTS_LOADING_SUCCESS:
      return {
        ...state,
        clientsList: action.payload,
        loading: false,
      };
    case CLIENTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_SELECTED_CLIENT: {
      return {
        ...state,
        selectedClient: action.payload,
      };
    }
    default:
      return state;
  }
};

export default clients;
