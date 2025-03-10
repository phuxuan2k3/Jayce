import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { useEffect } from "react";
import { useRefreshMutation } from "./features/Auth/authApi.ts";
import { clearAuthState, setAuthState } from "./app/redux/authSlice.ts";
import { useAppDispatch } from "./app/redux/hooks.ts";
import LocalStorageService from "./services/localstorage.service.ts";

function App() {
	const [refresh] = useRefreshMutation();
	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	const authState = LocalStorageService.getAuthState();
	// 	if (authState != null && authState.tokens != null && authState.user != null) {
	// 		dispatch(setAuthState({
	// 			user: authState.user,
	// 			tokens: authState.tokens,
	// 		}));
	// 		console.log('authState:', authState.tokens);

	// 		refresh({ token: { safe_id: authState.tokens.safe_id, refresh_token: authState.tokens.refresh_token, access_token: authState.tokens.access_token, role: authState.tokens.role } });
	// 	}
	// 	else {
	// 		dispatch(clearAuthState());
	// 	}
	// }, []);

	return (
		<RouterProvider router={router} />
	);
}

export default App;