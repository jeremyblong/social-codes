import { INTRO_COMPLETED } from "../types.js";

export const introCompleted = (item) => {
	return {
		type: "INTRO_COMPLETED",
		payload: item
	}
}