import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import React from 'react'
import MyButton from '../buttons/MyButton';
import { parseQueryError } from '../../../../helpers/fetchBaseQuery.error';
import MyDialog from '../MyDialog';

export default function ErrorDialog({ error }: { error?: FetchBaseQueryError | SerializedError }) {
	const [isError, setIsError] = React.useState(false);

	React.useEffect(() => {
		if (error) {
			setIsError(true);
		}
	}, [error]);

	if (!isError || !error) {
		return null;
	}
	const errorMessage = parseQueryError(error) || "An unexpected error occurred. Please try again.";

	return (
		<MyDialog>
			<div className="text-red-500 text-center bg-red-50 border border-red-200 rounded-lg p-4 shadow-md">
				<p className="text-lg font-semibold">An error occurred</p>
				<p className="mt-2">{errorMessage}</p>

				<div className='mt-4'>
					<MyButton
						variant={"primary"}
						onClick={() => setIsError(false)}
					>
						Close
					</MyButton>
				</div>
			</div>
		</MyDialog>
	)
}
