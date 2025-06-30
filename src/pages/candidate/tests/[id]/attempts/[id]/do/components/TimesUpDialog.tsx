import MyButton from '../../../../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../../../../features/tests/ui/MyDialog';

export default function TimesUpDialog({
	isOpen,
	onBackToTest,
}: {
	isOpen: boolean;
	onBackToTest: () => void;
}) {
	if (!isOpen) return null;
	return (
		<MyDialog>
			<div className='w-[50vw] max-w-md bg-white rounded-lg shadow-lg'>
				<div className="p-4">
					<h2 className="text-lg font-semibold">Time's Up!</h2>
					<p className="mt-2">Your time for this test has expired. Please acknowledge to proceed.</p>
				</div>
				<div className="flex justify-end p-4">
					<MyButton onClick={onBackToTest}>
						Back to Test
					</MyButton>
				</div>
			</div>
		</MyDialog>
	);
}
