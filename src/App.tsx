import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { authActions, authSelectors } from "./features/auth/store/authSlice.ts";
import { useRefreshMutation } from "./features/auth/api/auth.api.ts";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function App() {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
	const token = useAppSelector(authSelectors.selectTokens);
	const user = useAppSelector(authSelectors.selectUserInfo);
	const [refresh] = useRefreshMutation();

	useEffect(() => {
		if (isAuthenticated == false) {
			if (token != null && user != null) {
				refresh({
					access_token: token.access_token,
					refresh_token: token.refresh_token,
					safe_id: token.safe_id,
					user_id: user.id,
					role: user.role,
				});
			} else {
				dispatch(authActions.clearAuthState());
			}
		}
	}, []);
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer />
		</>
	);
}

export default App;