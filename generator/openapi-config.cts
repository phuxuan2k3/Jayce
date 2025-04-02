import type { ConfigFile } from '@rtk-query/codegen-openapi'

const baseApiDirString = __dirname + "/../src/app/bases";
const testsFeatureDirString = __dirname + "/../src/features/tests";

const testApi: ConfigFile = {
	apiFile: `${baseApiDirString}/test.api.ts`,
	schemaFile: `${testsFeatureDirString}/docs/openapi.json`,
	apiImport: "testApi",
	outputFile: `${testsFeatureDirString}/api/test.api-gen.ts`,
	exportName: "testApiGen",
	hooks: {
		queries: true,
		mutations: true,
		lazyQueries: true,
	}
}

// Export what API we want to generate
export default testApi;