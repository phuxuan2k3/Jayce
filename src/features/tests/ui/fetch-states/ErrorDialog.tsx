import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import React from 'react'
import MyButton from '../buttons/MyButton';
import { parseQueryError, parseQueryStatus } from '../../../../helpers/fetchBaseQuery.error';
import MyDialog from '../MyDialog';
import { CircleAlert } from 'lucide-react';
import { useAppSelector } from '../../../../app/hooks';
import { authSelectors } from '../../../auth/store/authSlice';
import { Role } from '../../../auth/types/auth';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../router/paths';

export default function ErrorDialog({ error }: { error?: FetchBaseQueryError | SerializedError }) {
	const navigate = useNavigate();

	const [isError, setIsError] = React.useState(false);
	const role = useAppSelector(authSelectors.selectRole);

	React.useEffect(() => {
		if (error) {
			setIsError(true);
		}
	}, [error]);

	if (!isError || !error) {
		return null;
	}
	const errorMessage = parseQueryError(error) || "An unexpected error occurred. Please try again.";
	let queryStatus = parseQueryStatus(error);

	return (
		<MyDialog>
			<MyDialog.Content className='flex flex-col gap-4 items-center'>
				<div className='w-full flex items-center justify-start gap-2'>
					<CircleAlert className="w-6 h-6 text-red-500 flex-shrink-0" />
					{queryStatus === "PAYMENT_REQUIRED" ? (
						<span className="font-semibold text-red-600">
							Payment Required
						</span>
					) : queryStatus === "BAD_REQUEST" ? (
						<span className='font-semibold text-red-600'>
							Invalid Request
						</span>
					) : (
						<span className='font-semibold text-red-600'>
							An Error Ocurred
						</span>
					)}
				</div>


				{queryStatus === "PAYMENT_REQUIRED" && (
					<div className="w-full flex flex-col items-center gap-3 p-4 bg-yellow-50 border border-yellow-300 rounded-md shadow-md">
						<p className="text-sm text-yellow-800 text-center">
							Your current balance isn't sufficient for this operation. To continue, you'll need to refill your account.
						</p>
					</div>
				)}

				{queryStatus === "BAD_REQUEST" && (
					<div className="w-full text-red-500 p-4 bg-red-50 border border-red-200 rounded-md shadow-md">
						{errorMessage}
					</div>
				)}

				{queryStatus === "NOT_FOUND" && (
					<div className="w-full text-red-500 p-4 bg-red-50 border border-red-200 rounded-md shadow-md">
						<p className="text-sm">
							The requested resource was not found. Please check the details and try again.
						</p>
					</div>
				)}

				{queryStatus === "TOO_MANY_REQUESTS" && (
					<div className="w-full text-red-500 p-4 bg-red-50 border border-red-200 rounded-md shadow-md">
						<p className="text-sm">
							You have made too many requests in a short period. Please wait a moment before trying again.
						</p>
					</div>
				)}

				{queryStatus !== "PAYMENT_REQUIRED" ? (
					<MyButton
						className='w-full mt-4'
						variant={"gray"}
						onClick={() => setIsError(false)}
					>
						Close
					</MyButton>
				) : (
					<div className='w-full flex items-center gap-4'>
						<MyButton
							className='flex-1'
							variant={"gray"}
							onClick={() => setIsError(false)}
						>
							Close
						</MyButton>
						<MyButton className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md'
							onClick={() => {
								if (role === Role.Candidate) {
									navigate(paths.candidate.profile.PRICING);
								} else if (role === Role.Manager) {
									navigate(paths.manager.profile.PRICING);
								}
							}}
						>
							Go to Payment
						</MyButton>
					</div>
				)}


			</MyDialog.Content>
		</MyDialog>
	)
}
