import authRestApi from "../../../Auth/api/authRestApi";
import { UserInfo } from "../../../Auth/store/authSlice";

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