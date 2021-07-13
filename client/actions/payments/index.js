import { PAYMENT_COMPLETED_FULL, PAYMENT_COMPLETED_PARTIAL } from "../types.js";

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