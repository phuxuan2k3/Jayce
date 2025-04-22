import React, { useState } from "react";

type DifficultyLevel = "easy" | "medium" | "hard";

// Define a focused interface with only necessary fields
interface TestFilters {
	minMinutesToAnswer?: number | null;
	maxMinutesToAnswer?: number | null;
	difficulty?: DifficultyLevel[] | string;
}

interface Props {
	open: boolean;
	onClose: () => void;
	filters: TestFilters;
	setFilters: React.Dispatch<React.SetStateAction<TestFilters>>;
}

const MAX = 150;

const FilterModal: React.FC<Props> = ({ filters, open, onClose, setFilters }) => {
	const [minuteValuePair, setMinuteValuePair] = useState<number[]>([
		filters.minMinutesToAnswer || 0,
		filters.maxMinutesToAnswer || MAX
	]);

	const [isRangeMin, setIsRangeMin] = useState<boolean>(true);

	const [difficultyValue, setDifficultyValue] = useState<DifficultyLevel[]>(
		Array.isArray(filters.difficulty) ? filters.difficulty : []
	);

	const onRangeMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
		// Determine which thumb (min or max) the user is clicking on
		const rangeInput = e.currentTarget;
		const rangeRect = rangeInput.getBoundingClientRect();
		const mouseX = e.clientX - rangeRect.left;
		const rangeWidth = rangeRect.width;

		// Calculate the position of min and max thumbs in pixels
		const minThumbPos = (minuteValuePair[0] / MAX) * rangeWidth;
		const maxThumbPos = (minuteValuePair[1] / MAX) * rangeWidth;

		// Determine which thumb is closer to the click position
		const distToMin = Math.abs(mouseX - minThumbPos);
		const distToMax = Math.abs(mouseX - maxThumbPos);

		// Set the active thumb based on which one is closer
		setIsRangeMin(distToMin <= distToMax);
	}

	const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (isRangeMin && value < minuteValuePair[1]) {
			setMinuteValuePair([value, minuteValuePair[1]]);
		}
		else if (!isRangeMin && value > minuteValuePair[0]) {
			setMinuteValuePair([minuteValuePair[0], value]);
		}
	}

	const handleDifficultyChange = (difficulty: DifficultyLevel) => (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setDifficultyValue([...difficultyValue, difficulty]);
		} else {
			setDifficultyValue(difficultyValue.filter(d => d !== difficulty));
		}
	};

	const handleApplyFilters = () => {
		setFilters({
			...filters,
			minMinutesToAnswer: minuteValuePair[0],
			maxMinutesToAnswer: minuteValuePair[1],
			difficulty: difficultyValue.length > 0 ? difficultyValue : undefined,
		});
		onClose();
	};

	if (!open) return null;

	return (
		<div className="font-sans fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="relative bg-white rounded-lg w-full max-w-md mx-4 md:mx-auto shadow-lg animate-fadeIn">
				{/* Modal Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<div className=" text-xl font-bold text-center text-primary">
						Filter Tests
					</div>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 focus:outline-none"
					>
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Modal Body */}
				<div className="p-6">
					{/* Duration Filter */}
					<div className="mb-6">
						<div className="text-md font-semibold mb-2">Duration (minutes)</div>
						<div className="mb-1 flex items-center justify-between">
							{/* Min Input */}
							<div className="flex items-center gap-2">
								<span className="text-gray-500">Min</span>
								<input
									type="number"
									value={minuteValuePair[0]}
									onChange={(e) => {
										const newValue = parseInt(e.target.value);
										if (newValue < minuteValuePair[1]) {
											setMinuteValuePair([newValue, minuteValuePair[1]]);
										}
									}}
									className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
									placeholder="Min"
								/>
							</div>

							{/* Max Input */}
							<div className="flex items-center gap-2">
								<span className="text-gray-500">Max</span>
								<input
									type="number"
									value={minuteValuePair[1]}
									onChange={(e) => {
										const newValue = parseInt(e.target.value);
										if (newValue > minuteValuePair[0]) {
											setMinuteValuePair([minuteValuePair[0], newValue]);
										}
									}}
									className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
									placeholder="Max"
								/>
							</div>
						</div>

						<div className="relative h-6 my-4">
							{/* Track background */}
							<div className="absolute top-1/2 transform -translate-y-1/2 h-1 w-full bg-gray-200 rounded-full"></div>

							{/* Active track */}
							<div
								className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-primary rounded-full"
								style={{
									left: `${(minuteValuePair[0] / MAX) * 100}%`,
									width: `${((minuteValuePair[1] - minuteValuePair[0]) / MAX) * 100}%`
								}}
							></div>

							{/* Min thumb */}
							<div
								className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer"
								style={{
									left: `calc(${(minuteValuePair[0] / MAX) * 100}% - 8px)`
								}}
							></div>

							{/* Max thumb */}
							<div
								className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer"
								style={{
									left: `calc(${(minuteValuePair[1] / MAX) * 100}% - 8px)`
								}}
							></div>

							{/* Range inputs (invisible but handle interactions) */}
							<input
								type="range"
								min="0"
								max={MAX}
								value={isRangeMin ? minuteValuePair[0] : minuteValuePair[1]}
								step={1}
								onMouseDown={onRangeMouseDown}
								onChange={handleRangeChange}
								className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
							/>
						</div>
					</div>

					{/* Difficulty Filter */}
					<div>
						<div className="text-md font-semibold mb-2">Difficulty</div>
						<div className="space-y-2">
							{(["easy", "medium", "hard"] as DifficultyLevel[]).map((difficulty) => (
								<label key={difficulty} className="flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={difficultyValue.includes(difficulty)}
										onChange={handleDifficultyChange(difficulty)}
										className="w-4 h-4 accent-primary cursor-pointer"
									/>
									<span className="ml-2 capitalize">{difficulty}</span>
								</label>
							))}
						</div>
					</div>
				</div>

				{/* Modal Footer */}
				<div className="p-4 border-t flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-lg mr-2 hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={handleApplyFilters}
						className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 font-semibold"
					>
						Apply Filters
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterModal;
