import authApi from "../../../auth/api/auth.api";
import { UserInfo } from "../../../auth/store/authSlice";

interface ListUsersRequest {
	user_ids: number[];
}

interface ListUsersResponse {
	users: UserInfo[];
}

interface FindUserByMetadataRequest {
	name?: string;
	company?: string;
	country?: string;
	jobTitle?: string;
	roles?: number[];
}

interface FindUserByMetadataResponse {
	ids: string[];
}

const bulbasaurAPI = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listUsers: builder.mutation<ListUsersResponse, ListUsersRequest>({
			query: (body) => ({
				url: '/list',
				method: 'POST',
				body
			})
		}),
		findUsersByMetadata: builder.mutation<FindUserByMetadataResponse, FindUserByMetadataRequest>({
			query: (body) => ({
				url: '/find',
				method: 'POST',
				body,
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useListUsersMutation,
	useFindUsersByMetadataMutation,
} = bulbasaurAPI;