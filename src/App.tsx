import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import LocalStorageService from "./services/localstorage.service.ts";
import { useEffect } from "react";
import { useRefreshMutation } from "./features/Auth/authApi.ts";
import { clearAuthState } from "./global/authSlice.ts";
import { useAppDispatch } from "./app/hooks.ts";

function App() {
	const [refresh] = useRefreshMutation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		// Tokens are valid, and only use token from redux, NOT localStorage
		const refreshToken = LocalStorageService.getRefreshToken();
		if (refreshToken != null) {
			refresh({ refreshToken });
		}
		else {
			dispatch(clearAuthState());
		}
	}, []);

	return (
		<RouterProvider router={router} />
	);
}

export default App;