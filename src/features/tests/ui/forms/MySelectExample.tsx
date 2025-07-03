import { useState } from 'react'
import MySelect from './MySelect'

export default function MySelectExample() {
	const [selectedValue, setSelectedValue] = useState<string | number>('')
	const [selectedCountry, setSelectedCountry] = useState<string | number>('')

	const options = [
		{ value: '1', label: 'Option 1' },
		{ value: '2', label: 'Option 2' },
		{ value: '3', label: 'Option 3', disabled: true },
		{ value: '4', label: 'Option 4' }
	]

	const countryOptions = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'fr', label: 'France' },
		{ value: 'de', label: 'Germany' }
	]

	return (
		<div className="p-8 space-y-6 max-w-md">
			<h1 className="text-2xl font-bold text-gray-900">MySelect Examples</h1>

			{/* Basic select */}
			<MySelect
				options={options}
				value={selectedValue}
				onChange={setSelectedValue}
				label="Basic Select"
				placeholder="Choose an option..."
				required
			/>

			{/* Select with inherited HTML attributes */}
			<MySelect
				options={countryOptions}
				value={selectedCountry}
				onChange={setSelectedCountry}
				label="Country Selection"
				placeholder="Select your country..."
				name="country"
				id="country-select"
				autoComplete="country"
				data-testid="country-selector"
				aria-describedby="country-help"
			/>
			<p id="country-help" className="text-sm text-gray-600">
				Select your country for shipping purposes
			</p>

			{/* Error state */}
			<MySelect
				options={options}
				value=""
				onChange={() => { }}
				label="Select with Error"
				placeholder="This field has an error..."
				error="Please select a valid option"
				required
			/>

			{/* Different sizes */}
			<div className="space-y-4">
				<MySelect
					options={options}
					label="Small Size"
					size="sm"
					placeholder="Small select..."
				/>

				<MySelect
					options={options}
					label="Medium Size (Default)"
					size="md"
					placeholder="Medium select..."
				/>

				<MySelect
					options={options}
					label="Large Size"
					size="lg"
					placeholder="Large select..."
				/>
			</div>

			{/* Disabled state */}
			<MySelect
				options={options}
				label="Disabled Select"
				placeholder="This is disabled..."
				disabled
			/>

			{/* Display selected values */}
			<div className="mt-6 p-4 bg-gray-50 rounded-md">
				<h3 className="font-semibold text-gray-900 mb-2">Selected Values:</h3>
				<p className="text-sm text-gray-700">Basic Select: {selectedValue || 'None'}</p>
				<p className="text-sm text-gray-700">Country: {selectedCountry || 'None'}</p>
			</div>
		</div>
	)
}
