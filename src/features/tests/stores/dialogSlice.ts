import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExamCore } from '../../../infra-test/core/test.model';

interface DialogState {
	manager: {
		deleteExam: ExamCore | null;
	}
}

const initialState: DialogState = {
	manager: {
		deleteExam: null, // Exam to delete, null means no exam is selected for deletion
	}
};

const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		setDeleteExam(state, action: PayloadAction<ExamCore | null>) {
			state.manager.deleteExam = action.payload;
		}
	}
});

export default dialogSlice;