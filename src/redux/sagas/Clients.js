const {
  call,
  takeEvery,
  put,
  all,
  fork,
  takeLeading,
  takeLatest,
} = require("redux-saga/effects");
const {
  requestClientsCompleted,
  requestClientsError,
} = require("redux/actions/Clients");
const { CLIENTS_LOADING } = require("redux/constants/Clients");
const { default: clientsService } = require("services/ClientsService");

function* clientsWatcherSaga() {
  yield takeLatest(CLIENTS_LOADING, fetchClientsWorkerSaga);
}

function* fetchClientsWorkerSaga() {
  try {
    const clients = yield call(clientsService.getClients);
    if (clients) {
      yield put(requestClientsCompleted(clients));
    } else {
      yield put(requestClientsError("No data"));
    }
  } catch (error) {
    console.warn("CLIENTS LOADING ERROR: ", error);
  }
}

export default function* rootSaga() {
  yield all([fork(clientsWatcherSaga)]);
}
