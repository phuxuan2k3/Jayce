import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { selectRole, setAuthState } from "../features/Auth/store/authSlice";
import { noAuth } from "./env";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useRole = () => {
	const dispatch = useAppDispatch();
	if (noAuth == true) {
		dispatch(setAuthState({
			user: {
				email: "123@gmail.com",
				username: "johndoe",
				metadata: null
			},
			tokens: {
				access_token: "string",
				refresh_token: "string",
				role: 1,
				safe_id: "string",
				user_id: 1
			}
		}));
	}
	return useAppSelector(selectRole);
}
