import { SIGNUP_DATA, USER_SIGNED_IN, USER_DATA } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case SIGNUP_DATA: 
			return {
				...state,
				data: action.payload
			}
        case USER_SIGNED_IN: 
            return {
                ...state,
                authenticated: action.payload
            }
        case USER_DATA: 
            return {
                ...state,
                authData: action.payload
            }
		default: 
			return state;
	}
}