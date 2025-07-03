import { TemplateCoreSchema } from "../../api/test.api-gen-v2";


export type TemplatePersistCoreSchema = Omit<TemplateCoreSchema, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const EMPTY_TEMPLATE_PERSIST: TemplatePersistCoreSchema = {
	name: '',
	title: '',
	description: '',
	numberOfQuestions: 5,
	difficulty: "Intern",
	tags: [],
	numberOfOptions: 4,
	outlines: [],
	minutesToAnswer: 10,
	language: "English",
};
