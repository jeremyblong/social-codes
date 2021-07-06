import { SIGNUP_DATA, USER_SIGNED_IN, USER_DATA } from "../types.js";

export const addSignupData = (item) => {
	return {
		type: "SIGNUP_DATA",
		payload: item
	}
}
export const userSignedIn = (item) => {
    return {
        type: "USER_SIGNED_IN",
        payload: item
    }
}
export const signedInUserData = (item) => {
    return {
        type: "USER_DATA",
        payload: item
    }
}