import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import axios from 'axios';

function* getChartData() {
    try {
		const { data } = yield call(axios.get, 'http://82.202.204.94/tmp/test.php');
        yield put({ type: 'SET_CHART_DATA', payload: data.chart });
	} catch (e) {
		message.warning('Error');
	}
}

export function* chartSaga() {
	yield all ([
		takeLatest('GET_CHART_DATA', getChartData),
	]);
}
    