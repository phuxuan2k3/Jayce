import { EMPTY_PRACTICE_GENERATION as EMPTY_PRACTICE_GENERATION, PracticeDifficulty } from "../types";
import { PracticeGenerationAction, PracticeGenerationActionTypes, PracticeGenerationState } from "./reducer-types";

export const initialState: PracticeGenerationState = {
	data: EMPTY_PRACTICE_GENERATION,
	apiError: null,
	template: null,
	error: null,
	loadingState: "none",
};

export const practiceGenerationReducer = (
	state: PracticeGenerationState = initialState,
	action: PracticeGenerationAction
): PracticeGenerationState => {
	switch (action.type) {
		case PracticeGenerationActionTypes.SET_DATA:
			return {
				...state,
				data: action.payload,
				error: null,
			};
		case PracticeGenerationActionTypes.SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case PracticeGenerationActionTypes.SET_LOADING_STATE:
			return {
				...state,
				loadingState: action.payload,
			};
		case PracticeGenerationActionTypes.SET_API_ERROR:
			return {
				...state,
				apiError: action.payload,
			};
		case PracticeGenerationActionTypes.APPLY_TEMPLATE:
			return {
				...state,
				template: action.payload,
				...(action.payload != null && {
					data: {
						...state.data,
						...action.payload,
						difficulty: action.payload.difficulty as PracticeDifficulty,
					}
				}),
			};
		default:
			return state;
	}
}