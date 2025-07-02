import { cn } from "../../../../../../app/cn";
import MyButton from "../../../../../../features/tests/ui/buttons/MyButton";

export default function BottomNavButtons({
	className = "",
	onBack,
	onNext,
	isLastStep = false,
	isFirstStep = false,
}: {
	className?: string;
	onBack: () => void;
	onNext: () => void;
	isLastStep?: boolean;
	isFirstStep?: boolean;
}) {
	return (
		<div className={cn(`flex items-center justify-between`, className)}>
			<MyButton
				disabled={isFirstStep}
				className="w-1/4 min-w-fit"
				onClick={onBack}
			>
				Back
			</MyButton>
			<MyButton
				disabled={isLastStep}
				className={cn("w-1/4 min-w-fit")}
				onClick={onNext}
			>
				Next
			</MyButton>
		</div>
	)
}
