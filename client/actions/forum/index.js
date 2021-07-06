import { FORUM_COMMENTS } from "../types.js";

export const addForumComments = (item) => {
	return {
		type: "FORUM_COMMENTS",
		payload: item
	}
}