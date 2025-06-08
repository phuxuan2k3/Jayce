import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExamCore } from '../core/test.model';

interface State {
	exam: ExamCore | null;
}

const initialState: State = {
	exam: null,
};

const deleteExamSlice = createSlice({
	name: 'deleteExam',
	initialState,
	reducers: {
		setDeleteExam(state, action: PayloadAction<ExamCore | null>) {
			state.exam = action.payload;
		}
	}
});

export default deleteExamSlice;