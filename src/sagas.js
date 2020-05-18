import { all, fork } from 'redux-saga/effects';
import { sagaWatcherGetUser, sagaWatcherLogoutUser } from './ducks/auth/auth';
import { sagaWatcherLogin } from './ducks/login/login';

export default function* rootSaga() {
  yield all([
    fork(sagaWatcherGetUser),
    fork(sagaWatcherLogoutUser),
    fork(sagaWatcherLogin),
  ]);
}
