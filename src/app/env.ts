const backendEndpoint: string = import.meta.env.VITE_BACKEND_URL as string;
const noAuth = import.meta.env.VITE_NO_AUTH as boolean;

if (
	backendEndpoint == undefined ||
	noAuth == undefined
) {
	throw new Error("Environment variables are not set properly");
}

export {
	backendEndpoint,
	noAuth,
};