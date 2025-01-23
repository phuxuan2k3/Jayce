import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.tsx";
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./app/store.ts";

// Test again

const rootElement = document.getElementById("root");
const theme = createTheme({
	components: {
		MuiPopover: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiPopper: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiDialog: {
			defaultProps: {
				container: rootElement,
			},
		},
		MuiModal: {
			defaultProps: {
				container: rootElement,
			},
		},
	},
});

createRoot(rootElement!).render(
	<StrictMode>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</StyledEngineProvider>
	</StrictMode>
);
