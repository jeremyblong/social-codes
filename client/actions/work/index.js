import { SAVE_FILES } from "../types.js";

export const saveFilesPane = (item) => {
	return {
		type: "SAVE_FILES",
		payload: item
	}
}