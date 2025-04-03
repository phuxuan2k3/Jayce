import authApi from "../../../auth/api/auth.api";
import { UserInfo } from "../../../auth/store/authSlice";

interface ListUsersRequest {
	user_ids: number[];
}

interface ListUsersResponse {
	users: UserInfo[];
}

const bulbasaurAPI = authApi.injectEndpoints({
	endpoints: (builder) => ({
		listUsers: builder.mutation<ListUsersResponse, ListUsersRequest>({
			query: (body) => ({
				url: '/account/list',
				method: 'POST',
				body
			})
		}),
	}),
	overrideExisting: false,
});

export const {
	useListUsersMutation
} = bulbasaurAPI;