import { PAYMENT_COMPLETED_FULL, PAYMENT_COMPLETED_PARTIAL } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case PAYMENT_COMPLETED_FULL: 
			return {
				...state,
				fullPaymentCompleted: action.payload
			}
        case PAYMENT_COMPLETED_PARTIAL:
            return {
                ...state,
                partialPaymentCompleted: action.payload
            }
		default: 
			return state;
	}
}