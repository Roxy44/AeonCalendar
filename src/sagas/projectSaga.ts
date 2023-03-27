import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import axios from 'axios';

function* getProjectData() {
    try {
		const data = {
            project: "DMS 2.0","period":"02.09.2022-31.12.2022",
            chart: {
                id: 1, 
                title: "Marketing Launch", 
                period_start: "2022-09-02", 
                period_end: "2022-09-08",
                sub: [{
                    id:2,
                    title: "Banners for social networks",
                    period_start: "2022-09-02",
                    period_end: "2022-09-07","sub": [{
                        id: 3,
                        title: "Choosing a platform for ads",
                        period_start: "2022-09-02",
                        period_end: "2022-09-06","sub":[{
                            id: 4,
                            title: "Custom issue level #4",
                            period_start: "2022-09-03",
                            period_end: "2022-09-05","sub":[
                                {
                                    id: 5,
                                    title: "Custom issue level #5",
                                    period_start: "2022-09-04",
                                    period_end: "2022-09-05"
                                },
                                {
                                    id: 6,
                                    title: "Custom task", period_start: "2022-09-05", 
                                    period_end: "2022-09-05"
                                }
                            ]
                        }]
                    }]
                }]
            }
        };
        
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
    