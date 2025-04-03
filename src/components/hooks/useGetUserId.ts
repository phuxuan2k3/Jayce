import { useAppSelector } from "../../app/hooks";
import { authSelectors } from "../../features/auth/store/authSlice";


export default function useGetUserId() {
	const userId = useAppSelector(authSelectors.selectUserIdStrict);
	return userId;
}
