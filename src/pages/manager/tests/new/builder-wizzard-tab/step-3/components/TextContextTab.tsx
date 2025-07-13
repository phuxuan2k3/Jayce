import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '../../../../../../../app/cn';
import { classNameInput } from "../../../common/class-names";
import { useLanguage } from '../../../../../../../LanguageProvider';

interface TextContextTabProps {
	value: string;
	onChange: (value: string) => void;
}

export default function TextContextTab({ value, onChange }: TextContextTabProps) {
	const { t } = useLanguage();

	return (
		<div>
			<TextareaAutosize
				minRows={6}
				placeholder={t("text_context_placeholder")}
				className={cn(classNameInput)}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
}
