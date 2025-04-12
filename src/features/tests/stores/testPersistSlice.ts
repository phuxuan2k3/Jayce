import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTestParam } from "../types/crud";
import { GetTestsByTestIdApiResponse, GetManagerTestsByTestIdQuestionsApiResponse, PostManagerTestsApiArg, PutManagerTestsByTestIdApiArg } from "../api/test.api-gen";

type TestPersist = CreateTestParam & {
	id?: number;
}

type TestFields = Omit<CreateTestParam, | "questions">;
type TestQuestion = CreateTestParam["questions"][number];

type TestPersistState = {
	data: TestPersist;
	error: string | null;
	status: "create" | "update",
	checkPoint: TestPersist | null;
}

const initialState: TestPersistState = {
	data: {
		tagIds: [],
		title: "",
		description: "",
		difficulty: "easy",
		minutesToAnswer: 10,
		questions: [],
	},
	status: "create",
	error: null,
	checkPoint: null,
}

// TODO: split and extends slices for create, edit

const testPersistSlice = createSlice({
	name: 'testPersist',
	initialState,
	reducers: {
		// For creation.
		loadCreate: (state) => {
			state.data = {
				tagIds: [],
				title: '',
				description: '',
				difficulty: "easy",
				minutesToAnswer: 10,
				questions: []
			}
			state.status = "create";
			state.error = null;
			state.checkPoint = null;
		},
		// For editing.
		saveCheckpoint: (state) => {
			state.checkPoint = structuredClone
				? structuredClone(state.data) // Use structuredClone if available
				: JSON.parse(JSON.stringify(state.data)); // Fallback for deep copy
		},
		restoreCheckpoint: (state) => {
			if (state.checkPoint) {
				state.data = structuredClone
					? structuredClone(state.checkPoint) // Use structuredClone if available
					: JSON.parse(JSON.stringify(state.checkPoint)); // Fallback for deep copy
			}
		},
		clearCheckpoint: (state) => {
			state.checkPoint = null;
		},
		loadUpdate: (state, action: PayloadAction<{
			testQueryData: GetTestsByTestIdApiResponse;
			questionsQueryData: GetManagerTestsByTestIdQuestionsApiResponse;
		}>) => {
			state.data = {
				...action.payload.testQueryData,
				tagIds: action.payload.testQueryData.tags.map(t => t.id),
				difficulty: action.payload.testQueryData.difficulty as "easy" | "medium" | "hard" || "hard",
				questions: action.payload.questionsQueryData.map((question) => ({
					text: question.text,
					options: question.options,
					correctOption: question.correctOption,
					points: question.points,
				})),
			};
			state.status = "update";
			state.error = null;
			state.checkPoint = null;
		},
		// Common actions.
		setTestField: (state, action: PayloadAction<{
			key: keyof Pick<TestFields, "title" | "description">,
			value: string,
		} | {
			key: keyof Pick<TestFields, "difficulty">,
			value: "easy" | "medium" | "hard",
		} | {
			key: keyof Pick<TestFields, "minutesToAnswer">,
			value: number,
		} | {
			key: keyof Pick<TestFields, "tagIds">,
			value: number[],
		}>) => {
			state.data = {
				...state.data,
				[action.payload.key]: action.payload.value,
			}
		},
		setTagIds: (state, action: PayloadAction<number[]>) => {
			state.data.tagIds = action.payload;
		},
		setQuestions: (state, action: PayloadAction<TestQuestion[]>) => {
			state.data.questions = action.payload;
		},
		addQuestion: (state, action: PayloadAction<TestQuestion | undefined>) => {
			if (action.payload) {
				state.data.questions.push(action.payload);
			}
			else {
				state.data.questions.push({
					text: "",
					points: 0,
					correctOption: 0,
					options: ["", "", "", ""],
				});
			}
		},
		setQuestionField: (state, action: PayloadAction<{
			index: number;
		} & ({
			key: keyof Pick<TestQuestion, "text">;
			value: string;
		} | {
			key: keyof Pick<TestQuestion, "points" | "correctOption">;
			value: number;
		}
			)>) => {
			const { index, key, value } = action.payload;
			const question = getQuestion(state, index);
			if (question) {
				state.data.questions[index] = {
					...state.data.questions[index],
					[key]: value,
				}
			}
		},
		deleteQuestion: (state, action: PayloadAction<{ index: number }>) => {
			const { index } = action.payload;
			const question = getQuestion(state, index);
			if (question) {
				state.data.questions.splice(index, 1);
			}
		},
		addOption: (state, action: PayloadAction<{
			index: number;
			text: string;
		}>) => {
			const { index, text } = action.payload;
			const question = getQuestion(state, index);
			if (question) {
				question.options.push(text);
			}
		},
		setOptionField: (state, action: PayloadAction<{
			index: number;
			optionIndex: number;
			text: string;
		}>) => {
			const { index, optionIndex, text } = action.payload;
			const question = getQuestion(state, index);
			if (question) {
				question.options[optionIndex] = text;
			}
		},
		deleteOption: (state, action: PayloadAction<{
			index: number;
			optionIndex: number;
		}>) => {
			const { index, optionIndex } = action.payload;
			const question = getQuestion(state, index);
			if (question) {
				question.options.splice(optionIndex, 1);
			}
		},
		clear: (state) => {
			state.data = initialState.data;
			state.status = initialState.status;
			state.error = null;
			state.checkPoint = null;
		},
	},
	selectors: {
		selectTestId: (state: TestPersistState) => {
			return state.data.id;
		},
		selectTestFields: (state: TestPersistState) => {
			return {
				title: state.data.title,
				description: state.data.description,
				difficulty: state.data.difficulty,
				minutesToAnswer: state.data.minutesToAnswer,
				tagIds: state.data.tagIds,
			}
		},
		selectQuestions: (state: TestPersistState) => {
			return state.data.questions;
		},
		selectError: (state: TestPersistState) => state.error,
		selectCreateTestApiArg: (state: TestPersistState): PostManagerTestsApiArg | null => {
			if (state.status === "create") {
				const { id, ...rest } = state.data;
				return {
					body: rest,
				};
			}
			return null;
		},
		selectUpdateTestApiArg: (state: TestPersistState): PutManagerTestsByTestIdApiArg | null => {
			if (state.status === "update") {
				const { id, ...rest } = state.data;
				return {
					testId: id,
					body: rest,
				};
			}
			return null;
		}
	}
});


export const testPersistActions = testPersistSlice.actions;
export const testPersistSelectors = testPersistSlice.selectors;

export default testPersistSlice.reducer;

function getQuestion(state: TestPersistState, index: number): TestQuestion | null {
	if (state.data.questions[index]) {
		return state.data.questions[index];
	}
	state.error = "Question index out of range.";
	return null;
}