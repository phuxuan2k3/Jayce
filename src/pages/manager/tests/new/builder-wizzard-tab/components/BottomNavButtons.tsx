import MyButton from '../../../../../../infra-test/ui/buttons/MyButton'

export default function BottomNavButtons({
	onBack,
	onNext,
}: {
	onBack: () => void;
	onNext: () => void;
}) {
	return (
		<div className='flex items-center justify-between'>
			<MyButton
				onClick={onBack}
			>
				Back
			</MyButton>
			<MyButton
				onClick={onNext}
			>
				Next
			</MyButton>
		</div>
	)
}
