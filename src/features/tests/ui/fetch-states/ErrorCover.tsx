import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { parseQueryError } from '../../../../helpers/fetchBaseQuery.error'

export default function ErrorCover({ error }: { error: FetchBaseQueryError | SerializedError | unknown }) {
	const errorMessage = parseQueryError(error);
	return (
		<div className="flex justify-center items-center w-full h-full p-2">
			<div className="text-red-500 text-center bg-red-50 border border-red-200 rounded-lg p-4 shadow-md">
				<p className="text-lg font-semibold">An error occurred</p>
				<p className="mt-2">{errorMessage}</p>
			</div>
		</div>
	)
}
