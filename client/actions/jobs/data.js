import { JOB_DATA } from "../types.js";

export const addJobData = (item) => {
	return {
		type: "JOB_DATA",
		payload: item
	}
}