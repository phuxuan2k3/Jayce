import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
	schemaFile: './openapi.json',
	apiFile: '../src/features/Test/test.api.ts',
	apiImport: 'testApi',
	outputFile: '../src/features/Test/test.api.v2.ts',
	exportName: 'testApiV2',
	hooks: true,
}

export default config;