const backendEndpoint: string = import.meta.env.VITE_BACKEND_URL as string;
const noAuth = Boolean(import.meta.env.VITE_NO_AUTH) as boolean ?? false;

const threshUrl = import.meta.env.VITE_THRESH_URL as string;
const threshSocketUrl = import.meta.env.VITE_THRESH_SOCKET_URL as string;

const bulbasaurUrl = import.meta.env.VITE_BULBASAUR_URL as string;

const dariusUrl = import.meta.env.VITE_DARIUS_URL as string;

const url = {
	thresh: {
		base: threshUrl ?? backendEndpoint + '/thresh/api/test',
		socket: threshSocketUrl ?? backendEndpoint,
	},
	bulbasaur: bulbasaurUrl ?? backendEndpoint + '/bulbasaur',
	darius: dariusUrl ?? backendEndpoint + '/darius',
};

export {
	backendEndpoint,
	noAuth,
	url,
};