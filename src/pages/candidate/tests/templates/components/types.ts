import { TemplateCoreSchema } from "../../../../../infra-test/api/test.api-gen-v2";

export type TemplateFormData = Omit<TemplateCoreSchema, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const EmptyTemplateForm: TemplateFormData = {
	name: '',
	title: '',
	description: '',
	numberOfQuestions: 5,
	difficulty: "easy",
	tags: [],
	numberOfOptions: 4,
	outlines: [],
	minutesToAnswer: 10,
	language: "English",
};
