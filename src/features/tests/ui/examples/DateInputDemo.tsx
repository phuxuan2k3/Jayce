import { useState } from 'react';
import MyDateInput from '../forms/MyDateInput';

export default function DateInputDemo() {
	const [selectedDate, setSelectedDate] = useState('2025-01-15');

	return (
		<div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg">
			<h2 className="text-2xl font-bold text-primary-toned-800 mb-6">
				Custom Date Input Demo
			</h2>

			<div className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Date
					</label>
					<MyDateInput
						value={selectedDate}
						onChange={setSelectedDate}
						placeholder="Choose a date"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Date Range (with min/max)
					</label>
					<MyDateInput
						placeholder="Select date within range"
						min="2025-01-01"
						max="2025-12-31"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Disabled Input
					</label>
					<MyDateInput
						value="2025-01-01"
						disabled
						placeholder="This is disabled"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						With Error
					</label>
					<MyDateInput
						placeholder="Select date"
						error="Please select a valid date"
					/>
				</div>

				<div className="mt-6 p-4 bg-gray-50 rounded-md">
					<h3 className="text-lg font-semibold text-primary-toned-700 mb-2">
						Selected Value:
					</h3>
					<p className="text-gray-600 font-mono">
						{selectedDate || 'No date selected'}
					</p>
				</div>
			</div>
		</div>
	);
}
