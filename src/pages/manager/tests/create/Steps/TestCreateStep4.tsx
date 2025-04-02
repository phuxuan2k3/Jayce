import { faCheck, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { testPersistActions, testPersistSelectors } from "../../../../../features/tests/stores/testPersistSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import QuestionEditCard from "../../common/QuestionEditCard";

export default function TestCreateStep4({
	onNext,
	isLoading,
}: {
	onNext: () => void;
	isLoading: boolean;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useAppDispatch();
	const {
		selectTestFieldsStrict,
		selectQuestionsStrict,
	} = testPersistSelectors;
	const testFields = useAppSelector(selectTestFieldsStrict);
	const questions = useAppSelector(selectQuestionsStrict);
	const {
		setTestField,
		saveCheckpoint,
		restoreCheckpoint,
		clearCheckpoint,
	} = testPersistActions;

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full flex-1 flex-col mt-6 text-center">
					<div className="w-full text-xl font-semibold font-arya text-[24px]">Review and refine the generated questions before finalizing your test.</div>
				</div>

				<div className="w-full max-w-7xl py-6">
					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Overview ({questions.length})</span>

							{isEditing == false ? (
								<FontAwesomeIcon
									className="ms-3 w-5 h-5 cursor-pointer"
									icon={faEdit}
									onClick={() => {
										setIsEditing(true);
										dispatch(saveCheckpoint());
									}}
								/>
							) : (
								<div>
									<FontAwesomeIcon
										className="ms-3 w-5 h-5 cursor-pointer"
										icon={faCheck}
										onClick={() => {
											dispatch(clearCheckpoint());
											setIsEditing(false);
										}}
									/>
									<FontAwesomeIcon
										className="ms-3 w-5 h-5 cursor-pointer"
										icon={faXmark}
										onClick={() => {
											dispatch(restoreCheckpoint());
											setIsEditing(false);
										}}
									/>
								</div>
							)}
						</div>

						<div className="flex w-4/6  flex-wrap gap-1">
							<div className="flex">
								<span className="w-80 font-bold">
									Tilte
								</span>
								{isEditing == false ? (
									<span className="w-96 ">{testFields.title}</span>
								) : (
									<input
										className="border w-96 p-1 rounded-md px-2"
										type="text"
										value={testFields.title}
										onChange={(e) => dispatch(setTestField({
											key: "title",
											value: e.target.value,
										}))}
									/>
								)}
							</div>
							<div className="flex">
								<span className="w-80 font-bold">
									Description
								</span>
								{isEditing == false ? (
									<span className="w-96 ">{testFields.description}</span>
								) : (
									<input
										className="border w-96  p-1 rounded-md px-2"
										type="text"
										value={testFields.description}
										onChange={(e) => dispatch(setTestField({
											key: "description",
											value: e.target.value,
										}))}
									/>
								)}

							</div>
							<div className="flex">
								<span className="w-80 font-bold">
									Tags
								</span>
								{/* TODO: add tags */}
								{isEditing == false ? (
									<span className="w-96">*Tags</span>
								) : (
									<input
										className="border w-96  p-1 rounded-md px-2"
										type="text"
									/>
								)}
							</div>

							<div className="flex">
								<span className="w-80 font-bold">
									Duration
								</span>
								{isEditing == false ? (
									<span className="w-96">{testFields.minutesToAnswer} min</span>
								) : (
									<input
										className="border w-96  p-1 rounded-md px-2"
										type="text"
										value={testFields.minutesToAnswer}
										onChange={(e) => dispatch(setTestField({
											key: "minutesToAnswer",
											value: Number(e.target.value) || 0,
										}))}
									/>
								)}
							</div>

							<div className="flex">
								<span className="w-80 font-bold">
									Difficulty
								</span>
								{isEditing == false ? (
									<span className="w-96 ">{testFields.difficulty}</span>
								) : (
									<select
										className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
										value={testFields.difficulty}
										onChange={(e) => dispatch(setTestField({
											key: "difficulty",
											value: e.target.value as "easy" | "medium" | "hard",
										}))}
									>
										<option value="easy">Easy</option>
										<option value="medium">Medium</option>
										<option value="hard">Hard</option>
									</select>
								)}
							</div>
						</div>


						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4 mt-4">
							<span>Question List ({questions.length})</span>
						</div>

						{/* Question List */}
						{questions.map((question, index) => (
							<QuestionEditCard
								question={question}
								index={index}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="pb-12 flex justify-center ">
				{isLoading ? (
					<div className="flex items-center justify-center">
						<svg
							className="animate-spin h-8 w-8 border-t-4 border-b-4 border-[var(--primary-color)] rounded-full"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
							/>
						</svg>
					</div>
				) : (
					<button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={onNext}>
						Publish
					</button>
				)}
			</div >
		</>
	)
};
