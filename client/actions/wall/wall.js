import { WALL_POST_SETTINGS, ADD_WALL_POSTS, ADD_POST_CREATION_OPTIONS, SAVE_VIDEO_WALL_PREP } from "../types.js";

export const wallPostSettings = (item) => {
	return {
		type: "WALL_POST_SETTINGS",
		payload: item
	}
}
export const wallPostsAdd = (item) => {
	return {
		type: "ADD_WALL_POSTS",
		payload: item
	}
}
export const addPostCreationOptions = (item) => {
	return {
		type: "ADD_POST_CREATION_OPTIONS",
		payload: item
	}
}
export const addVideoToWallQueue = (item) => {
	return {
		type: "SAVE_VIDEO_WALL_PREP",
		payload: item
	}
}