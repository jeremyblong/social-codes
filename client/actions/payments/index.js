import { PAYMENT_COMPLETED_FULL, PAYMENT_COMPLETED_PARTIAL, PAYMENT_COMPLETED_CUSTOM_HOURLY, PAYMENT_COMPLETED_MINIMUM_HOURLY } from "../types.js";

export const paymentCompletedFull = (item) => {
	return {
		type: "PAYMENT_COMPLETED_FULL",
		payload: item
	}
}
export const paymentCompletedPartial = (item) => {
	return {
		type: "PAYMENT_COMPLETED_PARTIAL",
		payload: item
	}
}
export const paymentCompletedCustomHourly = (item) => {
	return {
		type: "PAYMENT_COMPLETED_CUSTOM_HOURLY",
		payload: item
	}
}
export const paymentCompletedMinimumHourly = (item) => {
	return {
		type: "PAYMENT_COMPLETED_MINIMUM_HOURLY",
		payload: item
	}
}