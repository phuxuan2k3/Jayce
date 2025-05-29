import TextareaAutosize from "react-textarea-autosize";
import { ExamConfigPersist } from "../../../../infra-test/core/test.model";

export default function ExamConfigForm({
	configEdit,
	onConfigEditChange,
}: {
	configEdit: ExamConfigPersist;
	onConfigEditChange: (configEdit: Partial<ExamConfigPersist>) => void;
}) {
	return (
		<div className="text-base [&>label]:text-primary [&>label]:font-semibold w-full h-full overflow-y-auto grid grid-cols-[auto_1fr] items-center place-items-end gap-y-6 gap-x-8 p-6 ">
			<div className="col-span-2 border-b border-primary-toned-300 w-full" />

			<label htmlFor="test-title">
				Title:
			</label>
			<input
				id="test-title"
				type="text"
				placeholder="Title"
				className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
				value={configEdit.title}
				onChange={(e) => onConfigEditChange({
					title: e.target.value,
				})}
			/>

			<label htmlFor="test-description" className="self-start mt-2">
				Description:
			</label>
			<TextareaAutosize
				id="test-description"
				minRows={1}
				placeholder="Describe your test"
				className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
				value={configEdit.description}
				onChange={(e) => onConfigEditChange({
					description: e.target.value,
				})}
			/>

			<label htmlFor="test-duration">
				Duration:
			</label>
			<div className="flex items-center gap-x-4 w-full">
				<input
					id="test-duration"
					type="text"
					placeholder="Enter duration"
					className="w-1/6 h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
					value={configEdit.minutesToAnswer}
					onChange={(e) => onConfigEditChange({
						minutesToAnswer: Number(e.target.value) || 1,
					})}
				/>
				<span className="text-sm text-primary-toned-500 text-ellipsis">
					Minutes
				</span>
			</div>

			<div className="col-span-2 border-b border-primary-toned-300 w-full" />

			<label htmlFor="test-open-at">
				Open time:
			</label>
			<div className="flex items-center gap-x-4 w-full">
				<div className="flex items-center gap-x-2">
					<span className="text-sm text-primary-toned-500">From:</span>
					<input
						id="test-open-at"
						type="datetime-local"
						className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
						value={configEdit.openDate.toISOString().slice(0, 16)}
						onChange={(e) => {
							const date = new Date(e.target.value);
							onConfigEditChange({
								openDate: date,
							});
						}}
					/>
				</div>
				<div className="flex items-center gap-x-2">
					<span className="text-sm text-primary-toned-500">To:</span>
					<input
						id="test-close-at"
						type="datetime-local"
						className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
						value={configEdit.closeDate.toISOString().slice(0, 16)}
						onChange={(e) => {
							const date = new Date(e.target.value);
							onConfigEditChange({
								closeDate: date,
							});
						}}
					/>
				</div>
			</div>

			<label htmlFor="test-password">
				Password:
			</label>
			<div className="flex items-center gap-x-4 w-full">
				<div className="flex items-center gap-x-2">
					<input
						type="checkbox"
						id="use-password"
						className="mr-2"
						checked={configEdit.password !== null}
						onChange={(e) => {
							onConfigEditChange({
								password: e.target.checked ? "" : null,
							});
						}}
					/>
					<span className="text-sm text-primary-toned-500">Require password</span>
				</div>

				<input
					id="test-password"
					type="text"
					disabled={configEdit.password !== null}
					placeholder="Enter password"
					className={`w-1/3 h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2 ${configEdit.password === null ? "bg-gray-200 cursor-not-allowed" : ""}`}
					value={configEdit.password || ""}
					onChange={(e) => {
						if (configEdit.password !== null) {
							onConfigEditChange({
								password: e.target.value,
							});
						}
					}}
				/>
			</div>

			<label htmlFor="max-attempts">
				Attempts:
			</label>

			<div className="flex items-center gap-x-4 w-full">
				<input
					id="max-attempts"
					type="number"
					min="1"
					placeholder="Number of attempts"
					className="w-1/2 h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
					value={configEdit.numberOfAttemptsAllowed || 0}
					onChange={(e) => onConfigEditChange({
						numberOfAttemptsAllowed: Number(e.target.value),
					})}
				/>
				<span className="text-sm text-primary-toned-500 text-ellipsis">
					Maximum attempts allowed per participant
				</span>
			</div>

			<div className="col-start-2 flex flex-col gap-2 w-full">
				<div className="flex items-center gap-x-2">
					<input
						type="checkbox"
						id="show-results"
						className="mr-2"
						checked={configEdit.isAnswerVisible}
						onChange={(e) => onConfigEditChange({
							isAnswerVisible: e.target.checked,
						})}
					/>
					<span className="text-sm text-primary-toned-500">Allow participants to see their results after completion</span>
				</div>
				<div className="flex items-center gap-x-2">
					<input
						type="checkbox"
						id="show-results-others"
						className="mr-2"
						checked={configEdit.isAllowedToSeeOtherResults}
						onChange={(e) => onConfigEditChange({
							isAllowedToSeeOtherResults: e.target.checked,
						})}
					/>
					<span className="text-sm text-primary-toned-500">Allow participants to see results of other participants</span>
				</div>
			</div>

			<div className="col-span-2 border-b border-primary-toned-300 w-full" />
		</div>
	)
}
