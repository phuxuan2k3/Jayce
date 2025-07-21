import MyButton from "../../../../../../features/tests/ui/buttons/MyButton";

export default function ErrorScreen({
	onRetry,
	apiErrorMessage
}: {
	onRetry: () => void;
	apiErrorMessage: string;
}) {
	return (
		<div className='w-full h-full min-h-[200px] flex flex-col gap-4 items-center justify-center bg-red-100 text-red-600 p-4 rounded-lg border border-red-200'>
			<p>
				{apiErrorMessage}
			</p>
			<MyButton
				variant={"gray"}
				size={"medium"}
				onClick={onRetry}
			>
				Retry
			</MyButton>
		</div>
	)
}
