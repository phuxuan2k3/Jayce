let backendURL: string = "";
const urlMode = import.meta.env.VITE_URL_MODE as "DEV" | "PROD" | "MOCK";
if (urlMode === "MOCK") {
	backendURL = import.meta.env.VITE_MOCK_URL as string;
}
else if (urlMode === "DEV") {
	backendURL = import.meta.env.VITE_DEV_URL as string;
}
else if (urlMode === "PROD") {
	backendURL = import.meta.env.VITE_PROD_URL as string;
}

const isDevelopment = import.meta.env.DEV;
const noAuth = import.meta.env.VITE_NO_AUTH as boolean;

export {
	urlMode,
	backendURL,
	isDevelopment,
	noAuth,
};