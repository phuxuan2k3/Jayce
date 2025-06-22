import type { ConfigFile } from '@rtk-query/codegen-openapi'

const testApi: ConfigFile = {
	apiFile: `./../src/infra-test/base/test.api.ts`,
	schemaFile: `./../src/infra-test/openapi.json`,
	apiImport: "testApi",
	outputFile: `./../src/infra-test/api/test.api-gen-v2.ts`,
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