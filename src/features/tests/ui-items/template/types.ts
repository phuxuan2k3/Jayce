import { TemplateCoreSchema } from "../../api/test.api-gen-v2";


export type TemplatePersistCoreSchema = Omit<TemplateCoreSchema, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const EmptyTemplatePersist: TemplatePersistCoreSchema = {
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
