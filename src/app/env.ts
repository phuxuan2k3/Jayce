const backendEndpoint: string = import.meta.env.VITE_BACKEND_URL as string;
const noAuth = Boolean(import.meta.env.VITE_NO_AUTH) as boolean ?? false;

// Auth
const bulbasaurUrl = import.meta.env.VITE_BULBASAUR_URL as string;

// Account
const ivysaurUrl = import.meta.env.VITE_IVYSAUR_URL as string;

// Prompt
const dariusUrl = import.meta.env.VITE_DARIUS_URL as string;

// Chronobreak
const chronobreakUrl = import.meta.env.VITE_CHRONOBREAK_URL as string;

// Test
const threshUrl = import.meta.env.VITE_THRESH_URL as string;
const threshSocketUrl = import.meta.env.VITE_THRESH_SOCKET_URL as string;

// Scenario
const ekkoUrl = import.meta.env.VITE_EKKO_URL as string;


const url = {
	thresh: {
		base: threshUrl ?? backendEndpoint + '/thresh',
		socket: threshSocketUrl ?? backendEndpoint,
	},
	ekko: ekkoUrl ?? backendEndpoint + '/ekko',
	bulbasaur: bulbasaurUrl ?? backendEndpoint + '/bulbasaur',
	ivysaur: ivysaurUrl ?? backendEndpoint + '/ivysaur',
	darius: dariusUrl ?? backendEndpoint + '/darius',
	chronobreak: chronobreakUrl ?? backendEndpoint + '/chronobreak',
};

const mock = {
	userId: (import.meta.env.VITE_USER_ID as string) || 'anngo',
	roleId: (import.meta.env.VITE_ROLE_ID as string) || '1',
}

export {
	backendEndpoint,
	noAuth,
	url,
	mock,
};