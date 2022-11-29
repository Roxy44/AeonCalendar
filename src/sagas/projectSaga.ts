import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import axios from 'axios';

function* getProjectData() {
    try {
		const { data } = yield call(axios.get, 'http://82.202.204.94/tmp/test.php');
        yield put({ type: 'SET_PROJECT_DATA', payload: {project: data.project, period: data.period}});
	} catch (e) {
		message.warning('Error');
	}
}

export function* projectSaga() {
	yield all ([
		takeLatest('GET_PROJECT_DATA', getProjectData),
	]);
}
    