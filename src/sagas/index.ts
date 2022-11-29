import { fork, all } from 'redux-saga/effects'
import { chartSaga } from './chartSaga';
import { projectSaga } from './projectSaga';

export default function* rootSaga() {
    yield all([
			fork(chartSaga),
            fork(projectSaga),
    ])
}