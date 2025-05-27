import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../../../../app/store';

// Define types
export interface Topic {
	id: string;
	name: string;
	questionCount: number;
	difficulty: {
		easy: number;
		medium: number;
		hard: number;
	};
}

export interface WizardState {
	currentStep: number;
	isDirty: boolean;
	draftSaved: boolean;
	isLoading: boolean;
	error: string | null;

	// Step 1: Test Basics
	roleTitle: string;
	purpose: 'Screening' | 'Certification' | 'Upskilling' | '';
	totalQuestions: number;

	// Step 2: Question Blueprint
	topics: Topic[];

	// Step 3: Style & Refinement
	expertPersona: 'Senior Architect' | 'Hands-on Developer' | 'Beginner-Friendly' | '';
	temperature: number;
	selfConsistencyRuns: number;
	examples: string;
	selectedPresets: string[];

	// Step 4: Preview & Export
	generatedQuestions: Array<{
		id: string;
		question: string;
		difficulty: 'easy' | 'medium' | 'hard';
	}>;
	exportFormat: 'JSON' | 'PDF' | 'CSV';
	candidateEmail: string;
}

const initialState: WizardState = {
	currentStep: 1,
	isDirty: false,
	draftSaved: false,
	isLoading: false,
	error: null,

	// Step 1
	roleTitle: '',
	purpose: '',
	totalQuestions: 20,

	// Step 2
	topics: [],

	// Step 3
	expertPersona: '',
	temperature: 0.7,
	selfConsistencyRuns: 1,
	examples: '',
	selectedPresets: [],

	// Step 4
	generatedQuestions: [],
	exportFormat: 'JSON',
	candidateEmail: ''
};

export const wizardSlice = createSlice({
	name: 'wizard',
	initialState,
	reducers: {
		setCurrentStep: (state, action: PayloadAction<number>) => {
			state.currentStep = action.payload;
		},

		// Step 1 actions
		setRoleTitle: (state, action: PayloadAction<string>) => {
			state.roleTitle = action.payload;
			state.isDirty = true;
		},
		setPurpose: (state, action: PayloadAction<WizardState['purpose']>) => {
			state.purpose = action.payload;
			state.isDirty = true;
		},
		setTotalQuestions: (state, action: PayloadAction<number>) => {
			state.totalQuestions = action.payload;
			state.isDirty = true;
		},

		// Step 2 actions
		addTopic: (state, action: PayloadAction<Topic>) => {
			state.topics.push(action.payload);
			state.isDirty = true;
		},
		updateTopic: (state, action: PayloadAction<Topic>) => {
			const index = state.topics.findIndex(topic => topic.id === action.payload.id);
			if (index !== -1) {
				state.topics[index] = action.payload;
				state.isDirty = true;
			}
		},
		deleteTopic: (state, action: PayloadAction<string>) => {
			state.topics = state.topics.filter(topic => topic.id !== action.payload);
			state.isDirty = true;
		},
		reorderTopics: (state, action: PayloadAction<Topic[]>) => {
			state.topics = action.payload;
			state.isDirty = true;
		},

		// Step 3 actions
		setExpertPersona: (state, action: PayloadAction<WizardState['expertPersona']>) => {
			state.expertPersona = action.payload;
			state.isDirty = true;
		},
		setTemperature: (state, action: PayloadAction<number>) => {
			state.temperature = action.payload;
			state.isDirty = true;
		},
		setSelfConsistencyRuns: (state, action: PayloadAction<number>) => {
			state.selfConsistencyRuns = action.payload;
			state.isDirty = true;
		},
		setExamples: (state, action: PayloadAction<string>) => {
			state.examples = action.payload;
			state.isDirty = true;
		},
		togglePreset: (state, action: PayloadAction<string>) => {
			const presetIndex = state.selectedPresets.indexOf(action.payload);
			if (presetIndex === -1) {
				state.selectedPresets.push(action.payload);
			} else {
				state.selectedPresets.splice(presetIndex, 1);
			}
			state.isDirty = true;
		},

		// Step 4 actions
		setGeneratedQuestions: (state, action: PayloadAction<WizardState['generatedQuestions']>) => {
			state.generatedQuestions = action.payload;
		},
		updateGeneratedQuestion: (state, action: PayloadAction<{ id: string; question: string }>) => {
			const index = state.generatedQuestions.findIndex(q => q.id === action.payload.id);
			if (index !== -1) {
				state.generatedQuestions[index].question = action.payload.question;
			}
		},
		setExportFormat: (state, action: PayloadAction<WizardState['exportFormat']>) => {
			state.exportFormat = action.payload;
		},
		setCandidateEmail: (state, action: PayloadAction<string>) => {
			state.candidateEmail = action.payload;
		},

		// General actions
		saveAsDraft: (state) => {
			state.draftSaved = true;
			state.isDirty = false;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		resetWizard: () => initialState
	}
});

export const {
	setCurrentStep,
	setRoleTitle,
	setPurpose,
	setTotalQuestions,
	addTopic,
	updateTopic,
	deleteTopic,
	reorderTopics,
	setExpertPersona,
	setTemperature,
	setSelfConsistencyRuns,
	setExamples,
	togglePreset,
	setGeneratedQuestions,
	updateGeneratedQuestion,
	setExportFormat,
	setCandidateEmail,
	saveAsDraft,
	setLoading,
	setError,
	resetWizard
} = wizardSlice.actions;

// Selectors
export const selectWizardState = (state: RootState) => state.wizard;
export const selectTopics = (state: RootState) => state.wizard.topics;
export const selectGeneratedQuestions = (state: RootState) => state.wizard.generatedQuestions;

export default wizardSlice;

