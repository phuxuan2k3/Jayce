import { useState } from 'react';
import MyTimeInput from '../forms/MyTimeInput';

export default function TimeInputDemo() {
	const [selectedTime, setSelectedTime] = useState('14:30');
	const [time12Hour, setTime12Hour] = useState('09:00');
	const [timeRange, setTimeRange] = useState('');

	return (
		<div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold text-primary-toned-800 mb-6">
				Custom Time Input Demo
			</h2>

			<div className="space-y-6">
				{/* 24-hour format */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						24-Hour Format
					</label>
					<MyTimeInput
						value={selectedTime}
						onChange={setSelectedTime}
						placeholder="Select time"
						format="24"
					/>
				</div>

				{/* 12-hour format */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						12-Hour Format
					</label>
					<MyTimeInput
						value={time12Hour}
						onChange={setTime12Hour}
						placeholder="Select time"
						format="12"
					/>
				</div>

				{/* Time range with validation */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Business Hours (9 AM - 6 PM)
					</label>
					<MyTimeInput
						value={timeRange}
						onChange={setTimeRange}
						placeholder="Select time"
						format="12"
						min="09:00"
						max="18:00"
					/>
				</div>

				{/* 15-minute intervals */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						15-Minute Intervals
					</label>
					<MyTimeInput
						placeholder="Select time"
						format="24"
						step={15}
					/>
				</div>

				{/* Disabled input */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Disabled Input
					</label>
					<MyTimeInput
						value="12:00"
						disabled
						placeholder="This is disabled"
					/>
				</div>

				{/* With error */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						With Error
					</label>
					<MyTimeInput
						placeholder="Select time"
						error="Please select a valid time"
					/>
				</div>

				{/* Display current values */}
				<div className="mt-6 p-4 bg-gray-50 rounded-md">
					<h3 className="text-lg font-semibold text-primary-toned-700 mb-2">
						Selected Values:
					</h3>
					<div className="space-y-1 text-sm">
						<p><strong>24-Hour:</strong> {selectedTime || 'No time selected'}</p>
						<p><strong>12-Hour:</strong> {time12Hour || 'No time selected'}</p>
						<p><strong>Range:</strong> {timeRange || 'No time selected'}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
