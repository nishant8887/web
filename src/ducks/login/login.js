import { put, call, takeLatest } from 'redux-saga/effects';
import { getErrorsFromResponse } from '../utils/utils';

// Actions
const LOGIN = 'login/LOGIN';
const LOGIN_ERROR = 'login/LOGIN_ERROR';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';

// Reducer
const reducer = (state = { busy: false, errors: {} }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, busy: true };
    case LOGIN_SUCCESS:
      return { ...state, busy: false, errors: {} };
    case LOGIN_ERROR:
      return { ...state, busy: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;

// Action Creators
export const login = ({ history, email, password }) => ({
  type: LOGIN,
  history,
  email,
  password,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginError = errors => ({
  type: LOGIN_ERROR,
  errors,
});

// Sagas
function* sagaWorkerLogin(action) {
  try {
    let url = '/v1/login';
    const response = yield call(fetch, url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: action.email, password: action.password }),
    });

    const json = yield response.json();
    if (response.ok) {
      yield put(loginSuccess(json.data));
      // Redirect to home
      action.history.push('/');
    } else {
      yield put(loginError(getErrorsFromResponse(json)));
    }
  } catch (error) {
    yield put(loginError({ common: 'Server cannot be reached. Please check you connection.' }));
  }
}

export function* sagaWatcherLogin() {
  yield takeLatest(LOGIN, sagaWorkerLogin);
}
