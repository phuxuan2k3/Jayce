import { TestFields } from "../reducers/exam-persist.reducer";

export default function TestFieldsForm({
	testFields,
	onChange,
}: {
	testFields: TestFields;
	onChange: (field: { key: keyof TestFields, value: string | number }) => void;
}) {

	return (
		<div className="font-arya my-10 w-full min-h-fit border border-primary-toned-300 rounded-lg bg-white shadow-md p-4">
			<div className="flex justify-center items-center space-x-4 my-4">
				<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
					Test title:
				</label>
				<input
					type="text"
					placeholder="Title"
					className=" w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
					value={testFields.title}
					onChange={(e) => onChange({
						key: "title",
						value: e.target.value,
					})}
				/>
			</div>
			<div className="flex justify-center items-center space-x-4 my-4">
				<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
					Description:
				</label>
				<textarea
					placeholder="Descript your test"
					className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
					value={testFields.description}
					onChange={(e) => onChange({
						key: "description",
						value: e.target.value,
					})}
				/>
			</div>

			{/* TODO: set tags later */}
			<div className="flex justify-center items-center space-x-4 my-4">
				<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
					Tags:
				</label>
				<div className="w-2/4 flex">
					<input
						type="text"
						placeholder="Type or select"
						className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-tl-md rounded-bl-md focus:outline-none focus:ring focus:ring-teal-300"
					/>
					<div className="text-[36px] text-white bg-gradient-text  rounded-tr-md flex justify-center items-center pb-1  rounded-br-md w-12 text-center">
						<span>+</span>
					</div>
				</div>
			</div>

			{/* TODO: make it time selector */}
			<div className="flex justify-center items-center space-x-4 my-4">
				<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
					Duration:
				</label>
				<div className=" w-2/4">
					<input
						type="text"
						placeholder="Enter duration"
						className=" px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
						value={testFields.minutesToAnswer}
						onChange={(e) => onChange({
							key: "minutesToAnswer",
							value: Number(e.target.value),
						})}
					/>
					<span> minutes</span>
				</div>

			</div>
			<div className="flex justify-center items-center space-x-4 mb-10">
				<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
					Difficulty
				</label>
				<select
					className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
					value={testFields.difficulty}
					onChange={(e) => onChange({
						key: "difficulty",
						value: e.target.value as "easy" | "medium" | "hard",
					})}
				>
					<option value="">Select difficulty</option>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>
		</div>
	)
}
