import { INTRO_COMPLETED } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case INTRO_COMPLETED: 
			return {
				...state,
				completed: action.payload
			}
		default: 
			return state;
	}
}