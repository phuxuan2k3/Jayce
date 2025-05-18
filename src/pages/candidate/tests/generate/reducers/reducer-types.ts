import { TemplateCore } from "../../../../../features/tests/model/test.model";
import { PracticeGenerationData, PracticeGenerationLoadingState } from "../types";

export type PracticeGenerationReducer = {
	state: PracticeGenerationState;
	dispatch: React.Dispatch<PracticeGenerationAction>;
}

export type PracticeGenerationState = {
	data: PracticeGenerationData;
	template: TemplateCore | null;
	error: string | null;
	apiError: string | null;
	loadingState: PracticeGenerationLoadingState;
};

export enum PracticeGenerationActionTypes {
	SET_DATA = 'SET_DATA',
	APPLY_TEMPLATE = 'SET_TEMPLATE',
	SET_ERROR = 'SET_ERROR',
	SET_API_ERROR = 'SET_API_ERROR',
	SET_LOADING_STATE = 'SET_LOADING_STATE',
};

export type PracticeGenerationAction = {
	type: PracticeGenerationActionTypes.SET_DATA;
	payload: PracticeGenerationData;
} | {
	type: PracticeGenerationActionTypes.SET_ERROR;
	payload: string | null;
} | {
	type: PracticeGenerationActionTypes.SET_LOADING_STATE;
	payload: PracticeGenerationLoadingState;
} | {
	type: PracticeGenerationActionTypes.SET_API_ERROR;
	payload: string | null;
} | {
	type: PracticeGenerationActionTypes.APPLY_TEMPLATE;
	payload: TemplateCore | null;
}