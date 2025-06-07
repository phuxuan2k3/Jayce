import { cn } from "../../../../../../../app/cn";
import TextareaAutosize from "react-textarea-autosize";
import HelpText from "./components/HelpText";
import { LanguageType, languages, SeniorityType, seniorities } from "../../../common/base-types";
import { classNameInput } from "../../../common/classname";
import { Step1Data } from "../../../common/model-types";

export default function Step1({
	step1Data,
	onStep1DataChange,
}: {
	step1Data: Step1Data;
	onStep1DataChange: (data: Step1Data) => void;
}) {
	return (
		<>
			<div className="text-base [&>label]:text-primary [&>label]:font-semibold w-full h-full overflow-y-auto grid grid-cols-[auto_1fr] items-center place-items-end gap-y-6 gap-x-8 p-6">
				<label htmlFor="test-title">
					Title: <span className="text-red-500">*</span>
				</label>
				<div className="w-full">
					<input
						id="test-title"
						type="text"
						placeholder="Title"
						className={cn(classNameInput)}
						value={step1Data.title}
						onChange={(e) => onStep1DataChange({
							...step1Data,
							title: e.target.value,
						})}
					/>
				</div>

				<label htmlFor="test-description" className="self-start mt-2">
					Description: <span className="text-red-500">*</span>
				</label>
				<div className="w-full">
					<TextareaAutosize
						id="test-description"
						minRows={1}
						placeholder="Describe your test"
						className={cn(classNameInput)}
						value={step1Data.description}
						onChange={(e) => onStep1DataChange({
							...step1Data,
							description: e.target.value,
						})}
					/>
				</div>

				<label htmlFor="test-language">
					Language: <span className="text-red-500">*</span>
				</label>
				<div className="w-full">
					<select
						id="test-language"
						className={cn(classNameInput)}
						value={step1Data.language}
						onChange={(e) => onStep1DataChange({
							...step1Data,
							language: e.target.value as LanguageType,
						})}
					>
						{languages.map((lang) => (
							<option key={lang} value={lang}>
								{lang}
							</option>
						))}
					</select>
				</div>

				<label htmlFor="test-seniority">
					Seniority: <span className="text-red-500">*</span>
				</label>
				<div className="w-full">
					<select
						id="test-seniority"
						className={cn(classNameInput)}
						value={step1Data.seniority}
						onChange={(e) => onStep1DataChange({
							...step1Data,
							seniority: e.target.value as SeniorityType,
						})}
					>
						{seniorities.map((seniority) => (
							<option key={seniority} value={seniority}>
								{seniority}
							</option>
						))}
					</select>
				</div>			</div>

			<div className="px-6">
				<HelpText />
			</div>
		</>
	)
}
