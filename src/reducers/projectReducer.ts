import { actionType } from "../types";

const defaultState = {
	data: {
        project: '',
        period: '',
    }
}

export const projectReducer = (state = defaultState, action: actionType) => {
	switch(action.type) {
		case 'SET_PROJECT_DATA':
            return { ...state, data: { ...state.data, project: action.payload.project, period: action.payload.period }}
		default:
			return state;
	}
}

