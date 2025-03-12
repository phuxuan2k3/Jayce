import type { ConfigFile } from '@rtk-query/codegen-openapi'

const testApiDirString = __dirname + "/../src/features/Test/api";

const testApi: ConfigFile = {
	schemaFile: `${testApiDirString}/openapi.json`,
	apiFile: `${testApiDirString}/test.api.ts`,
	apiImport: "testApi",
	outputFile: `${testApiDirString}/test.api-gen.ts`,
	exportName: "testApiGen",
	hooks: {
		queries: true,
		mutations: true,
		lazyQueries: true,
	}
}

// Export what API we want to generate
export default testApi;