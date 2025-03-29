import loginAPI from "../../../features/Test/login.api";
import { UserInfo } from "../../../global/authSlice";

interface ListUsersRequest {
    user_ids: number[];
} 

interface ListUsersResponse {
    users: UserInfo[];
}

const bulbasaurAPI = loginAPI.injectEndpoints({
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