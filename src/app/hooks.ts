import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { authSelectors } from "../features/auth/store/authSlice";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default function useGetUserId() {
	const userId = useAppSelector(authSelectors.selectUserIdStrict);
	return userId;
}
