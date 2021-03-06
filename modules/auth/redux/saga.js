import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import history from 'browserHistory';
import * as CONSTANTS from './constants';
import { loginSuccess, loginError, signupSuccess, signupError,userProfileError,userProfileSuccess } from './actions';

export function* loginRequest(action) {
  try {
    const data = yield call(request, 'auth/login', 'POST', {
      email: action.email,
      password: action.password,
    });
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* signupRequest(action) {
  try {
    const data = yield call(request, 'auth/signup', 'POST', action.data);
    yield put(signupSuccess(data));
    notify.success('Your account has been created');
    history.push('/login');
  } catch (err) {
    yield put(signupError(err));
  }
}

export function* userProfileRequest(action) {
  try {
    const requestData = action.data
    let responseData = yield call(request, `profile/me`, 'POST', { ...requestData }, true);
    yield put(userProfileSuccess(responseData));
    
    notify.success('Profile saved');
  } catch (err) {
    yield put(userProfileError(err));
  }
}

export default function* authSaga() {
  yield takeLatest(CONSTANTS.LOGIN_REQUEST, loginRequest);
  yield takeLatest(CONSTANTS.SIGNUP_REQUEST, signupRequest);
  yield takeLatest(CONSTANTS.PROFILE_REQUEST, userProfileRequest);
}
