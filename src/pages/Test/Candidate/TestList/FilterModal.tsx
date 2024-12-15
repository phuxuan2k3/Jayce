import React, { useState } from "react";
import {
    Typography,
    MenuItem,
    Button,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent,
    Slider,
    Grid2 as Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { DifficultyLevel } from "./list.test-api";

interface FilterModalProps {
    meta: {
        minMinute: number;
        maxMinute: number;
        difficulty: DifficultyLevel;
    }
    open: boolean;
    onClose: () => void;
    onApplyFilters: (filters: {
        minMinute: number;
        maxMinute: number;
        difficulty: DifficultyLevel;
    }) => void;
}

const minDistance = 10;

const FilterModal: React.FC<FilterModalProps> = ({ meta, open, onClose, onApplyFilters }) => {

    const [minuteValuePair, setMinuteValuePair] = useState<number[]>([meta.minMinute, meta.maxMinute]);

    const [difficultyValue, setDifficultyValue] = useState<DifficultyLevel>(meta.difficulty);

    const handleMinuteSliderChange = (
        _event: Event | React.SyntheticEvent | MouseEvent,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setMinuteValuePair([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setMinuteValuePair([clamped - minDistance, clamped]);
            }
        } else {
            setMinuteValuePair(newValue as number[]);
        }
    };

    const handleSelectDifficultyChange = (event: SelectChangeEvent<string>) => {
        setDifficultyValue(event.target.value as "EASY" | "MEDIUM" | "HARD");
    };

    const handleApplyFilters = () => {
        onApplyFilters({
            minMinute: minuteValuePair[0],
            maxMinute: minuteValuePair[1],
            difficulty: difficultyValue,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="filter-modal-title">
            <DialogTitle>Filter Options</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid size={4}>
                        <Typography>Choose time range (minutes):</Typography>
                    </Grid>
                    <Grid size={8}>
                        <Slider
                            getAriaLabel={() => 'Minimum distance shift'}
                            step={5}
                            max={150}
                            getAriaValueText={(value) => `${value} minutes`}
                            value={minuteValuePair}
                            onChange={handleMinuteSliderChange}
                            valueLabelDisplay="auto"
                            disableSwap
                        />
                    </Grid>
                    <Grid size={4}>
                        <Typography>Select difficulty:</Typography>
                    </Grid>
                    <Grid size={8}>
                        <FormControl fullWidth size="small" variant="outlined" >
                            <InputLabel id="difficulty-select-label"> Difficulty</InputLabel>
                            <Select
                                labelId="difficulty-select-label"
                                value={difficultyValue?.toString() || ""}
                                onChange={handleSelectDifficultyChange}
                                label="Select your difficulty"
                            >
                                <MenuItem value={"HARD"}>Hard</MenuItem>
                                <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                                <MenuItem value={"EASY"}>Easy</MenuItem>
                                <MenuItem value={"ALL"}>All</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            {/* Action Buttons */}

            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleApplyFilters}>
                    Apply
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default FilterModal;
