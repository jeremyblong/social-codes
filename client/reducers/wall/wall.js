import { WALL_POST_SETTINGS, ADD_WALL_POSTS, ADD_POST_CREATION_OPTIONS, SAVE_VIDEO_WALL_PREP } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case WALL_POST_SETTINGS: 
			return {
				...state,
				wallPostSettings: action.payload
            }
		case ADD_WALL_POSTS:
			return {
				...state,
				posts: action.payload
			}
		case ADD_POST_CREATION_OPTIONS:
			return {
				...state,
				options: action.payload
			}
			break;
		case SAVE_VIDEO_WALL_PREP:
			return {
				...state,
				prep: action.payload
			}
		default: 
			return state;
	}
}