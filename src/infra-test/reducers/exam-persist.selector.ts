import { QuestionPersistOfTest } from "../persist/question.persist";
import { ExamConfigPersist } from "../persist/exam.persist";
import { ExamPersistState } from "./exam-persist.store";

const questionEditConstraint = (value: QuestionPersistOfTest): string[] => {
	const errors: string[] = [];
	if (!value.text || value.text.trim() === "") {
		errors.push("Question text is required");
	}
	if (value.options.length < 2) {
		errors.push("At least two options are required");
	}
	if (value.points <= 0) {
		errors.push("Points must be greater than 0");
	}
	if (value.correctOption < 0 || value.correctOption >= value.options.length) {
		errors.push("Correct option must be a valid index");
	}
	return errors;
};

const questionsEditConstraint = (value: QuestionPersistOfTest[]): string[] => {
	const errors: string[] = [];
	if (value.length === 0) {
		errors.push("At least one question is required");
	}
	value.forEach((question, index) => {
		const questionErrors = questionEditConstraint(question);
		questionErrors.forEach(error => {
			errors.push(`Question ${index + 1}: ${error}`);
		});
	});
	return errors;
};

const configConstraint = (value: ExamConfigPersist): string[] => {
	const errors: string[] = [];
	if (!value.description || value.description.trim() === "") {
		errors.push("Description is required");
	}
	if (value.minutesToAnswer <= 0) {
		errors.push("Minutes to answer must be greater than 0");
	}
	if (!value.language || value.language.trim() === "") {
		errors.push("Language is required");
	}
	if (value.numberOfAttemptsAllowed && value.numberOfAttemptsAllowed <= 0) {
		errors.push("Number of attempts allowed must be greater than 0");
	}
	const now = new Date();
	if (value.openDate && value.openDate < now) {
		errors.push("Open date must be in the future");
	}
	if (value.closeDate && value.closeDate < now) {
		errors.push("Close date must be in the future");
	}
	if (value.closeDate && value.openDate && value.closeDate < value.openDate) {
		errors.push("Close date must be after open date");
	}
	return errors;
};

export const examPersistSelectors = (state: ExamPersistState) => {
	const questionsErrors = questionsEditConstraint(state.questions.questions);
	const configErrors = configConstraint(state.config);
	const errors = [
		...questionsErrors,
		...configErrors,
	];
	return {
		errors,
		questionsErrors,
		configErrors,
	}
}