import { JOB_DATA } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case JOB_DATA: 
			return {
				...state,
				data: action.payload
			}
		default: 
			return state;
	}
}