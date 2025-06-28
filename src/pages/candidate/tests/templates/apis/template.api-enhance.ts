import { testApiGenV2 } from "../../../../../features/tests/api/test.api-gen-v2";

const templateApiEnhance = testApiGenV2.enhanceEndpoints({
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
		putTemplatesByTemplateId: {
			invalidatesTags: (_, __, arg) => [{ type: 'Templates', id: arg.templateId }],
		},
		deleteTemplatesByTemplateId: {
			invalidatesTags: (_, __, arg) => [{ type: 'Templates', id: arg.templateId }],
		},
	}
});

export const {
	useGetTemplatesQuery,
	usePostTemplatesMutation,
	usePutTemplatesByTemplateIdMutation,
	useDeleteTemplatesByTemplateIdMutation,
} = templateApiEnhance;