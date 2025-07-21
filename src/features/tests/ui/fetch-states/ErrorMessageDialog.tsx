import React from 'react'
import MyButton from '../buttons/MyButton';
import MyDialog from '../MyDialog';
import { CircleAlert } from 'lucide-react';

export default function ErrorMessageDialog({ errorMessage }: { errorMessage: string | undefined | null; }) {
	const [isError, setIsError] = React.useState(false);

	React.useEffect(() => {
		if (errorMessage) {
			setIsError(true);
		}
	}, [errorMessage]);

	if (!isError || !errorMessage) {
		return null;
	}
	return (
		<MyDialog>
			<MyDialog.Content className='flex flex-col gap-4 items-center'>
				<div className='w-full flex items-center justify-start gap-2'>
					<CircleAlert className="w-6 h-6 text-red-500 flex-shrink-0" />
					<span className='font-semibold text-red-600'>
						Error
					</span>
				</div>

				<div className="w-full text-red-500 p-4 bg-red-50 border border-red-200 rounded-md shadow-md">
					{errorMessage}
				</div>

				<MyButton
					className='w-full mt-4'
					variant={"gray"}
					onClick={() => setIsError(false)}
				>
					Close
				</MyButton>
			</MyDialog.Content>
		</MyDialog>
	)
}
