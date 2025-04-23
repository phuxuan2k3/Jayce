import { UserInfo } from "../store/authSlice";
import authApi from "./auth.api";

interface ListUsersRequest {
	user_ids: number[];
}

interface ListUsersResponse {
	users: UserInfo[];
}

const profileApi = authApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<ListUsersResponse, ListUsersRequest>({
			query: (body) => ({
				url: '/list',
				method: 'POST',
				body
			}),
		}),
	}),
})

export const {
	useGetUsersQuery,
} = profileApi;
