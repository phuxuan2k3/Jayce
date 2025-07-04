import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '../../../../../../../app/cn';
import { classNameInput } from "../../../common/class-names";

interface TextContextTabProps {
	value: string;
	onChange: (value: string) => void;
}

export default function TextContextTab({ value, onChange }: TextContextTabProps) {
	return (
		<div>
			<TextareaAutosize
				minRows={6}
				placeholder="Provide context information that the AI can use to generate relevant questions..."
				className={cn(classNameInput)}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}
