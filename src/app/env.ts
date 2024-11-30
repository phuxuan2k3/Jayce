let backendURL: string = "";
const urlMode = import.meta.env.VITE_URL_MODE as "DEV" | "PROD" | "MOCK";
if (urlMode === "MOCK") {
	backendURL = import.meta.env.VITE_BACKEND_URL_MOCK as string;
}
else if (urlMode === "DEV") {
	backendURL = import.meta.env.VITE_BACKEND_URL_DEV as string;
}
else if (urlMode === "PROD") {
	backendURL = import.meta.env.VITE_BACKEND_URL_PROD as string;
}

const isDevelopment = import.meta.env.DEV;
const noAuth = import.meta.env.VITE_NO_AUTH as boolean;

if (urlMode == undefined || backendURL == undefined || isDevelopment == undefined || noAuth == undefined) {
	throw new Error("Environment variables are not set properly");
}

export {
	urlMode,
	backendURL,
	isDevelopment,
	noAuth,
};