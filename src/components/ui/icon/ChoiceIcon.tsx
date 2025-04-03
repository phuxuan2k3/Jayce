import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChoiceIcon({ isCorrect }: { isCorrect: boolean }) {
	return isCorrect ? (
		<span className="text-green-600 font-semibold">
			<FontAwesomeIcon icon={faCircleCheck} />
		</span>
	) : (
		<span className="text-red-600 font-semibold">
			<FontAwesomeIcon icon={faCircleXmark} />
		</span>
	);
}
