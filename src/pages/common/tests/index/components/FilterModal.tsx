import React, { useState } from "react";
import {
	Typography,
	Button,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Slider,
} from "@mui/material";
import { GetTestsApiArg } from "../../../../../features/tests/api/test.api-gen";
import ModalBase from "../../../../../components/ui/modal/Modal.base";

interface Props {
	open: boolean;
	onClose: () => void;
	filters: GetTestsApiArg;
	setFilters: React.Dispatch<React.SetStateAction<GetTestsApiArg>>;
}

const STEP = 10;
const MAX = 150;
type DifficultyLevel = "easy" | "medium" | "hard";

const FilterModal: React.FC<Props> = ({ filters, open, onClose, setFilters }) => {

	const [minuteValuePair, setMinuteValuePair] = useState<number[]>([
		filters.minMinutesToAnswer || 0,
		filters.maxMinutesToAnswer || MAX
	]);

	const [difficultyValue, setDifficultyValue] = useState<DifficultyLevel[]>(
		Array.isArray(filters.difficulty) ? filters.difficulty : []
	);

	const handleMinuteSliderChange = (
		_event: Event | React.SyntheticEvent | MouseEvent,
		newValue: number | number[],
		activeThumb: number,
	) => {
		if (!Array.isArray(newValue)) {
			return;
		}
		if (newValue[1] - newValue[0] < STEP) {
			if (activeThumb === 0) {
				const clamped = Math.min(newValue[0], 100 - STEP);
				setMinuteValuePair([clamped, clamped + STEP]);
			} else {
				const clamped = Math.max(newValue[1], STEP);
				setMinuteValuePair([clamped - STEP, clamped]);
			}
		} else {
			setMinuteValuePair(newValue as number[]);
		}
	};

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

	return (
		<ModalBase isOpen={open} onClose={onClose}>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-4">
					<Typography>Choose time range (minutes):</Typography>
				</div>
				<div className="col-span-8">
					<Slider
						step={5}
						max={MAX}
						value={minuteValuePair}
						onChange={handleMinuteSliderChange}
						valueLabelDisplay="auto"
						disableSwap
					/>
				</div>
				<div className="col-span-4">
					<Typography>Select difficulty:</Typography>
				</div>
				<div className="col-span-8">
					<FormControl component="fieldset">
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={difficultyValue.includes("easy")}
										onChange={handleDifficultyChange("easy")}
									/>
								}
								label="Easy"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={difficultyValue.includes("medium")}
										onChange={handleDifficultyChange("medium")}
									/>
								}
								label="Medium"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={difficultyValue.includes("hard")}
										onChange={handleDifficultyChange("hard")}
									/>
								}
								label="Hard"
							/>
						</FormGroup>
					</FormControl>
				</div>
				<div className="col-span-12">
					<Button variant="contained" onClick={handleApplyFilters} className="mr-2">
						Apply
					</Button>
					<Button variant="outlined" onClick={onClose}>
						Cancel
					</Button>
				</div>
			</div>
		</ModalBase>
	);
};

export default FilterModal;
