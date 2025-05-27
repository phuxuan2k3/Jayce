import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import {
	selectWizardState,
	setRoleTitle,
	setPurpose,
	setTotalQuestions
} from '../../state/wizardSlice';

const TestBasics: React.FC = () => {
	const dispatch = useAppDispatch();
	const { roleTitle, purpose, totalQuestions } = useAppSelector(selectWizardState);

	const purposes = ['Screening', 'Certification', 'Upskilling'];

	return (
		<div className="space-y-8">
			{/* Role & Title */}
			<div className="space-y-2">
				<label htmlFor="roleTitle" className="block text-sm font-medium text-gray-700">
					Role & Title
				</label>
				<div className="relative">
					<input
						type="text"
						id="roleTitle"
						value={roleTitle}
						onChange={(e) => dispatch(setRoleTitle(e.target.value))}
						placeholder="e.g., Senior React Developer Technical Assessment"
						className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
					/>
					{roleTitle.length === 0 && (
						<p className="mt-1 text-xs text-red-500">Role & Title is required</p>
					)}
				</div>
				<p className="text-xs text-gray-500">
					Specify the role and a clear title for this assessment
				</p>
			</div>

			{/* Purpose */}
			<div className="space-y-2">
				<label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
					Purpose
				</label>
				<select
					id="purpose"
					value={purpose}
					onChange={(e) => dispatch(setPurpose(e.target.value as any))}
					className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="" disabled>Select a purpose</option>
					{purposes.map((p) => (
						<option key={p} value={p}>{p}</option>
					))}
				</select>
				{!purpose && (
					<p className="mt-1 text-xs text-red-500">Purpose is required</p>
				)}
				<p className="text-xs text-gray-500">
					Choose the main purpose of this assessment
				</p>
			</div>

			{/* Total Questions */}
			<div className="space-y-2">
				<label htmlFor="totalQuestions" className="block text-sm font-medium text-gray-700">
					Total Questions
				</label>
				<div className="flex items-center space-x-4">
					<button
						type="button"
						onClick={() => dispatch(setTotalQuestions(Math.max(5, totalQuestions - 5)))}
						disabled={totalQuestions <= 5}
						className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
					>
						-
					</button>

					<div className="relative flex-grow">
						<input
							type="range"
							id="totalQuestions"
							min="5"
							max="50"
							step="1"
							value={totalQuestions}
							onChange={(e) => dispatch(setTotalQuestions(parseInt(e.target.value)))}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
						<div className="absolute w-full flex justify-between text-xs text-gray-500 px-1 mt-1">
							<span>5</span>
							<span>50</span>
						</div>
					</div>

					<button
						type="button"
						onClick={() => dispatch(setTotalQuestions(Math.min(50, totalQuestions + 5)))}
						disabled={totalQuestions >= 50}
						className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
					>
						+
					</button>

					<div className="w-16 text-center">
						<input
							type="number"
							min="5"
							max="50"
							value={totalQuestions}
							onChange={(e) => {
								const value = parseInt(e.target.value);
								if (value >= 5 && value <= 50) {
									dispatch(setTotalQuestions(value));
								}
							}}
							className="block w-full px-2 py-1 text-center border border-gray-300 rounded-md"
						/>
					</div>
				</div>
				<p className="text-xs text-gray-500">
					Set the total number of questions for this assessment (5-50)
				</p>
			</div>
		</div>
	);
};

export default TestBasics;
