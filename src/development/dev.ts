const isDevEnv = import.meta.env.DEV;
const routePath = '/dev';

async function loadDevPage(): Promise<JSX.Element | null> {
	if (isDevEnv) {
		try {
			const pageModule = await import('./mocks/dev.page');
			return pageModule.default();
		} catch {
			console.error('Failed to load dev page module');
			return null;
		}
	}
	return null;
}


export const dev = {
	isDevEnv,
	routePath,
	loadDevPage,
};