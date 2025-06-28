import { useAppSelector } from '../../app/hooks'
import { authSelectors } from '../../features/auth/store/authSlice'
import { UnauthorizedError } from '../types/error';

export default function useGetUserId() {
	const userId = useAppSelector(authSelectors.selectUserId);
	if (!userId) {
		throw new UnauthorizedError();
	}
	return userId;
}
