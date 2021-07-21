import { SAVE_FILES } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case SAVE_FILES: 
			return {
				...state,
				filesSaved: action.payload
            }
		default: 
			return state;
	}
}