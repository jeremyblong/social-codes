import { VIDEO_CONFERENCE_INFORMATION } from "../types.js";

export const saveVideoConferenceInfo = (item) => {
	return {
		type: "VIDEO_CONFERENCE_INFORMATION",
		payload: item
	}
}