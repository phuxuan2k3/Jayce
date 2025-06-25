import { useAppSelector } from "../../app/hooks";
import { authSelectors } from "../../features/auth/store/authSlice";


export default function useGetUserIdStrict() {
	const userId = useAppSelector(authSelectors.selectUserIdStrict);
	return userId;
}
