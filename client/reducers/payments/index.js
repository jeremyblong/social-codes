import { PAYMENT_COMPLETED_FULL, PAYMENT_COMPLETED_PARTIAL, PAYMENT_COMPLETED_CUSTOM_HOURLY, PAYMENT_COMPLETED_MINIMUM_HOURLY } from "../../actions/types.js";


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
		case PAYMENT_COMPLETED_CUSTOM_HOURLY: 
			return {
				...state,
				customPaymentCompleted: action.payload
			}
		case PAYMENT_COMPLETED_MINIMUM_HOURLY: 
			return {
				...state,
				minimumHourlyPaymentCompleted: action.payload
			}
		default: 
			return state;
	}
}