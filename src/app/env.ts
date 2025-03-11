const backendEndpoint: string = import.meta.env.VITE_BACKEND_URL as string;
const noAuth = import.meta.env.VITE_NO_AUTH as boolean;
const threshUrl = import.meta.env.VITE_THRESH_URL as string;
const threshSocketUrl = import.meta.env.VITE_THRESH_SOCKET_URL as string;

const url = {
	thresh: {
		base: threshUrl ?? backendEndpoint + '/thresh/api/test',
		socket: threshSocketUrl ?? backendEndpoint,
	}
};

export {
	backendEndpoint,
	noAuth,
	url,
};