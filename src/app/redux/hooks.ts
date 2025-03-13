import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { selectRole, setAuthState } from "./authSlice";
import { noAuth } from "../env";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useRole = () => {
	const dispatch = useAppDispatch();
	if (noAuth == true) {
		dispatch(setAuthState({
			user: {
				"email": "string",
				"username": "string",
				"avatarPath": "string"
			},
			tokens: {
				"access_token": "string",
				"refresh_token": "string",
				"role": 1, // Role
				"safe_id": "string",
				"user_id": 0
			}
		}));
	}
	return useAppSelector(selectRole);
}
