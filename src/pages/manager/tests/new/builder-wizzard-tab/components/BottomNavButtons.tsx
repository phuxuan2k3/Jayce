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
		<div className={cn(`flex items-center w-full`, className)}>
			{isFirstStep === false && <MyButton
				disabled={isFirstStep}
				className="w-1/4 min-w-fit mr-auto"
				onClick={onBack}
			>
				Back
			</MyButton>}
			{isLastStep === false && <MyButton
				disabled={isLastStep}
				className={cn("w-1/4 min-w-fit ml-auto")}
				onClick={onNext}
			>
				Next
			</MyButton>}
		</div>
	)
}
