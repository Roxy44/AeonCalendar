import { actionType } from "../types";

const defaultState = {
	chart: [],
}

export const chartReducer = (state = defaultState, action: actionType) => {
	switch(action.type) {
		case 'SET_CHART_DATA':
			return { ...state, chart: [action.payload] }
		default:
			return state;
	}
}