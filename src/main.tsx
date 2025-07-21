import "regenerator-runtime/runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.tsx";
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LanguageProvider } from "./LanguageProvider.tsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const rootElement = document.getElementById("root");
const theme = createTheme({
	components: {
		MuiPopover: { defaultProps: { container: rootElement } },
		MuiPopper: { defaultProps: { container: rootElement } },
		MuiDialog: { defaultProps: { container: rootElement } },
		MuiModal: { defaultProps: { container: rootElement } },
	},
});

createRoot(rootElement!).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<LanguageProvider>
								<App />
							</LanguageProvider>
						</PersistGate>
					</Provider>
				</ThemeProvider>
			</StyledEngineProvider>
		</GoogleOAuthProvider>
	</StrictMode>
);

// async function prepare() {
// 	if (import.meta.env.MODE === 'development') {
// 		const { browserWorker } = await import('./msw-browser.ts');
// 		await browserWorker.start();
// 	}
// }

// prepare().catch((error) => {
// 	console.error('Error during MSW setup:', error);
// });
