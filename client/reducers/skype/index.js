import { VIDEO_CONFERENCE_INFORMATION } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case VIDEO_CONFERENCE_INFORMATION: 
			return {
				...state,
				invitation: action.payload
			}
		default: 
			return state;
	}
}