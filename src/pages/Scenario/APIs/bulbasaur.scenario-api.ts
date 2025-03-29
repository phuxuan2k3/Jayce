import authRestApi from "../../../features/Auth/api/authRestApi";
import { UserInfo } from "../../../features/Auth/store/authSlice";

interface ListUsersRequest {
	user_ids: number[];
}

interface ListUsersResponse {
	users: UserInfo[];
}

const bulbasaurAPI = authRestApi.injectEndpoints({
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