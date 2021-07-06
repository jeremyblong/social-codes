import { ADD_PORTFOLIO_DATA } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case ADD_PORTFOLIO_DATA: 
			return {
				...state,
				portfolio: action.payload
			}
		default: 
			return state;
	}
}