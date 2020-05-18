import { put, call, takeLatest, select } from 'redux-saga/effects';
import { LOGIN_SUCCESS } from '../login/login';
import Cookies from 'js-cookie';

// Constants
const ClientCookieName = 'gems_user';

// Actions
const GET_USER = 'auth/GET_USER';
const GET_USER_ERROR = 'auth/GET_USER_ERROR';
const GET_USER_SUCCESS = 'auth/GET_USER_SUCCESS';

const LOGOUT_USER = 'auth/LOGOUT_USER';

// Reducer
const reducer = (state = { user: undefined, init_done: false }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.user, init_done: true };
    case GET_USER_SUCCESS:
      return { ...state, user: action.user, init_done: true };
    case GET_USER_ERROR:
      return { ...state, init_done: true };
    case LOGOUT_USER:
      Cookies.remove(ClientCookieName);
      return { ...state, user: undefined, init_done: true };
    default:
      return state;
  }
};

export default reducer;

// Action Creators
export const getUser = () => ({
  type: GET_USER,
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  user,
});

export const getUserError = errors => ({
  type: GET_USER_ERROR,
  errors,
});

export const logoutUser = history => ({
  type: LOGOUT_USER,
  history,
});

// Sagas
function* sagaWorkerGetUser(action) {
  try {
    let url = '/v1/user';
    const response = yield call(fetch, url, {
      method: 'GET',
    });

    const json = yield response.json();
    if (response.ok) {
      yield put(getUserSuccess(json.data));
    } else {
      yield put(getUserError(getErrorsFromResponse(json)));
    }
  } catch (error) {
    yield put(getUserError({ common: 'Server cannot be reached. Please check you connection.' }));
  }
}

export function* sagaWatcherGetUser() {
  yield takeLatest(GET_USER, sagaWorkerGetUser);
}

export function* sagaWatcherLogoutUser() {
  yield takeLatest(LOGOUT_USER, function*(action) {
    action.history.push('/login');
    window.location.reload();
  });
}
