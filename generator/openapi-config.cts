import type { ConfigFile } from '@rtk-query/codegen-openapi'

const baseApiDirString = "./../src/features/tests";
const testsFeatureDirString = "./../src/features/tests";

const testApi: ConfigFile = {
	apiFile: `${baseApiDirString}/base/test.api.ts`,
	schemaFile: `${testsFeatureDirString}/docs/openapi.json`,
	apiImport: "testApi",
	outputFile: `${testsFeatureDirString}/api/test.api-gen.ts`,
	exportName: "testApiGen",
	hooks: {
		queries: true,
		mutations: true,
		lazyQueries: true,
	},
}

// Export what API we want to generate
export default testApi;