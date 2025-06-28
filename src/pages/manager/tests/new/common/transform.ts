import { QuestionPersistCoreSchema } from "../../../../../features/tests/ui-items/question/types";
import { ExamPersistCoreSchema } from "../../../../../features/tests/ui-items/test/types";
import { GetGenerateExamQuestionsApiRequest, GetGenerateExamQuestionsApiResponse } from "../apis/exam-generation.api";
import { LanguageType } from "./base-schema";
import { AllStepData } from "./types";

export function transformAllStepDataToGenerateArgs(allStepData: AllStepData): GetGenerateExamQuestionsApiRequest {
	return {
		title: allStepData.step1.title,
		description: allStepData.step1.description,
		language: allStepData.step1.language,
		topics: allStepData.step2.topics,
		creativity: allStepData.step3.creativity,
		context: {
			files: allStepData.step3.context.files,
			links: allStepData.step3.context.links,
			text: allStepData.step3.context.text,
		}
	};
}

export function transformGenerateResponseToQuestionsPersistCore(response: GetGenerateExamQuestionsApiResponse): QuestionPersistCoreSchema[] {
	return response.questions.map(question => ({
		id: -1,
		text: question.text,
		points: question.points,
		type: "MCQ",
		detail: {
			type: "MCQ",
			options: question.options,
			correctOption: question.correctOption,
		}
	}));
}

export function transformExamPersistToAllStepData(exam: ExamPersistCoreSchema): AllStepData {
	return {
		step1: {
			title: exam.title,
			description: exam.description,
			language: exam.language as LanguageType || "English",
		},
		step2: {
			topics: [],
		},
		step3: {
			creativity: 5,
			context: {
				files: [],
				links: [],
				text: "",
			},
		},
	}
}
