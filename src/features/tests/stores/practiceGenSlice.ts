import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetSuggestQuestionsRequest } from "../api/practice-generate.api";
import { QuestionPersistCoreSchema } from "../ui-items/question/types";

type PracticeGenState = {
	requestKey: string | null;
	requestData: GetSuggestQuestionsRequest | null;
	responseData: QuestionPersistCoreSchema[] | null;
	apiErrorMessage: string | null;
	savedTestId: string | null;
	genStatus: "none" | "generating" | "saving" | "saved";
};

const initialState: PracticeGenState = {
	requestKey: null,
	requestData: null,
	responseData: null,
	apiErrorMessage: null,
	savedTestId: null,
	genStatus: "none",
};

const practiceGenSlice = createSlice({
	reducerPath: "practiceGen",
	name: "practiceGen",
	initialState,
	reducers: {
		initializePolling: (state, action: PayloadAction<{
			data: GetSuggestQuestionsRequest;
			requestKey: string;
		}>) => {
			state.requestKey = action.payload.requestKey;
			state.requestData = action.payload.data;
			state.responseData = null;
			state.apiErrorMessage = null;
			state.savedTestId = null;
			state.genStatus = "generating";
		},
		donePolling: (state, action: PayloadAction<QuestionPersistCoreSchema[]>) => {
			state.responseData = action.payload;
			state.requestKey = null;
			state.genStatus = "saving";
		},
		savedResponse: (state, action: PayloadAction<string>) => {
			state.savedTestId = action.payload;
			state.genStatus = "saved";
		},
		acknowledgeGeneratedTest: (state) => {
			state.savedTestId = null;
			state.responseData = null;
			state.requestData = null;
			state.apiErrorMessage = null;
			state.genStatus = "none";
		},
		setApiError: (state, action: PayloadAction<string | null>) => {
			state.apiErrorMessage = action.payload;
		},
	},

	selectors: {
		selectRequestKey: (state: PracticeGenState) => state.requestKey,
		selectGenStatus: (state: PracticeGenState) => state.genStatus,
		selectRequestData: (state: PracticeGenState) => state.requestData,
		selectResponseData: (state: PracticeGenState) => state.responseData,
		selectSavedTestId: (state: PracticeGenState) => state.savedTestId,
		selectApiErrorMessage: (state: PracticeGenState) => state.apiErrorMessage,
	},
});

export default practiceGenSlice;
