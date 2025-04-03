import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import DebugRouter from "./dev/DebugRouter.tsx";

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;