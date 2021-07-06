import { FORUM_COMMENTS } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case FORUM_COMMENTS: 
			return {
				...state,
				comments: action.payload
			}
		default: 
			return state;
	}
}