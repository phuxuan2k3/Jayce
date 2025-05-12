import { testApiGen } from "../../../../../features/tests/api/test.api-gen";

const enhancedTestGenApi = testApiGen.enhanceEndpoints({
	addTagTypes: ['Templates'],
	endpoints: {
		getTemplates: {
			providesTags: (result) => {
				if (result) {
					return [
						...result.data.map(({ id }) => ({
							type: 'Templates' as const,
							id,
						})),
						{ type: 'Templates', id: 'LIST' },
					];
				}
				return [{ type: 'Templates' as const, id: 'LIST' }];
			}
		},
		postTemplates: {
			invalidatesTags: [{ type: 'Templates', id: 'LIST' }],
		},
		putTemplates: {
			invalidatesTags: (_, __, arg) => [{ type: 'Templates', id: arg.body.id }],
		},
		deleteTemplatesByTemplateId: {
			invalidatesTags: (_, __, arg) => [{ type: 'Templates', id: arg.templateId }],
		},
	}
});

export const {
	useGetTemplatesQuery,
	usePostTemplatesMutation,
	usePutTemplatesMutation,
	useDeleteTemplatesByTemplateIdMutation,
} = enhancedTestGenApi;