import type { ConfigFile } from '@rtk-query/codegen-openapi'

const testApi: ConfigFile = {
	apiFile: `./../src/features/tests/api/test.api.ts`,
	schemaFile: `./../src/features/tests/openapi.json`,
	apiImport: "testApi",
	outputFile: `./../src/features/tests/api/test.api-gen-v2.ts`,
	exportName: "testApiGenV2",
	hooks: {
		queries: true,
		mutations: true,
		lazyQueries: true,
	},
	tag: true,
}

// Export what API we want to generate
export default testApi;