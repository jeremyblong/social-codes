import { ADD_PORTFOLIO_DATA } from "../types.js";

export const addPortfolioData = (item) => {
	return {
		type: "ADD_PORTFOLIO_DATA",
		payload: item
	}
}