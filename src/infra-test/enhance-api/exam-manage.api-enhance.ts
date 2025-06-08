import { testApiGen } from "../../features/tests/api/test.api-gen";

const examManageApi = testApiGen.enhanceEndpoints({
	addTagTypes: ["Exam"],
	endpoints: {
		getExams: {
			providesTags: (result, _, __) => {
				if (result) {
					return [
						...result.data.map((exam) => ({
							type: "Exam" as const,
							id: exam.id
						})),
						{ type: "Exam" as const, id: "LIST" },
					];
				}
				return [{ type: "Exam" as const, id: "LIST" }];
			}
		},

		deleteExamsByTestId: {
			invalidatesTags: (_, __, arg) => [{ type: "Exam" as const, id: arg.testId }]
		},

		putExamsByTestId: {
			invalidatesTags: (_, __, arg) => [{ type: "Exam" as const, id: arg.testId }]
		},
	}
});

export const {
	useGetExamsQuery,
	useDeleteExamsByTestIdMutation,
	usePutExamsByTestIdMutation,
} = examManageApi;