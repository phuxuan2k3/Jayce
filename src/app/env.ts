const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const backendSocketUrl: string = import.meta.env
	.VITE_BACKEND_SOCKET_URL as string;

// Configurations
const noAuth =
	(Boolean(import.meta.env.VITE_NO_AUTH === "true") as boolean) ?? false;

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

// Irelia
const ireliaUrl = import.meta.env.VITE_IRELIA_URL as string;

// Graves
const gravesUrl = import.meta.env.VITE_GRAVES_URL as string;

// Speech to Text
const tahmkenchUrl = import.meta.env.VITE_TAHMKENCH_URL as string;

const url = {
	thresh: {
		base: threshUrl ?? backendUrl + "/thresh",
		socket: threshSocketUrl ?? backendSocketUrl,
	},
	ekko: ekkoUrl ?? backendUrl + "/ekko",
	bulbasaur: bulbasaurUrl ?? backendUrl + "/bulbasaur",
	ivysaur: ivysaurUrl ?? backendUrl + "/ivysaur",
	darius: dariusUrl ?? backendUrl + "/darius",
	chronobreak: chronobreakUrl ?? backendUrl + "/chronobreak",
	irelia: ireliaUrl ?? backendUrl + "/irelia",
	graves: gravesUrl ?? backendUrl + "/graves",
	tahmkench: tahmkenchUrl ?? backendUrl + "/tahmkench",
};

const mock = {
	userId: (import.meta.env.VITE_MOCK_USER_ID as string) || "1",
	roleId: (import.meta.env.VITE_MOCK_ROLE_ID as string) || "1",
};

export { backendUrl, backendSocketUrl, noAuth, url, mock };
