import React from 'react';
import {
	MyDropdown,
	DropdownTrigger,
	createDropdownItem,
	createDropdownDivider,
	DropdownItem
} from '../MyDropdown';

// Example icons (you can replace with your preferred icon library)
const ChevronDownIcon = () => (
	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
	</svg>
);

const UserIcon = () => (
	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
	</svg>
);

const SettingsIcon = () => (
	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
	</svg>
);

const LogoutIcon = () => (
	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
	</svg>
);

export const DropdownExample: React.FC = () => {
	// Example 1: Basic dropdown with predefined trigger
	const basicItems = [
		createDropdownItem('profile', 'View Profile', { icon: <UserIcon /> }),
		createDropdownItem('settings', 'Settings', { icon: <SettingsIcon /> }),
		createDropdownDivider(),
		createDropdownItem('logout', 'Logout', {
			icon: <LogoutIcon />,
			className: 'text-red-600 hover:text-red-700'
		}),
	];

	// Example 2: Advanced dropdown with custom items
	const advancedItems = [
		createDropdownItem('edit', 'Edit', { value: 'edit_action' }),
		createDropdownItem('duplicate', 'Duplicate', { value: 'duplicate_action' }),
		createDropdownItem('archive', 'Archive', { value: 'archive_action' }),
		createDropdownDivider(),
		createDropdownItem('delete', 'Delete', {
			value: 'delete_action',
			className: 'text-red-600 hover:text-red-700',
			onClick: (item) => {
				console.log('Delete clicked:', item);
				// You could show a confirmation modal here
			}
		}),
	];

	const handleItemSelect = (item: DropdownItem) => {
		console.log('Selected item:', item);
		// Handle the selection logic here
	};

	// Custom trigger component
	const CustomTrigger = ({ isOpen }: { isOpen: boolean }) => (
		<button className={`flex items-center gap-2 px-4 py-2 bg-gradient-1 text-white rounded-lg hover:shadow-primary transition-all duration-200 ${isOpen ? 'shadow-gradient' : ''}`}>
			<span>Custom Trigger</span>
			<ChevronDownIcon />
		</button>
	);

	// Custom item renderer
	const renderCustomItem = (item: DropdownItem, index: number) => {
		if (item.divider) {
			return (
				<div
					key={`divider-${index}`}
					className="border-t border-gradient my-2"
				/>
			);
		}

		return (
			<div
				key={item.id}
				className="px-4 py-3 hover:bg-primary-toned-50 dark:hover:bg-primary-toned-800 cursor-pointer transition-colors"
				onClick={() => handleItemSelect(item)}
			>
				<div className="flex items-center justify-between">
					<span className="font-medium">{item.label}</span>
					{item.icon && <span className="text-primary">{item.icon}</span>}
				</div>
				{item.value && (
					<div className="text-xs text-gray-500 mt-1">
						Action: {item.value}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="p-8 space-y-8">
			<h1 className="text-2xl font-bold mb-6">Dropdown Component Examples</h1>

			{/* Basic Dropdown */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold">Basic Dropdown</h2>
				<div className="flex flex-wrap gap-4">
					<MyDropdown
						trigger={
							<DropdownTrigger variant="primary">
								User Menu <ChevronDownIcon />
							</DropdownTrigger>
						}
						items={basicItems}
						onItemSelect={handleItemSelect}
						position="bottom-left"
					/>

					<MyDropdown
						trigger={
							<DropdownTrigger variant="outline">
								Actions <ChevronDownIcon />
							</DropdownTrigger>
						}
						items={advancedItems}
						onItemSelect={handleItemSelect}
						position="bottom-right"
					/>
				</div>
			</div>

			{/* Custom Trigger */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold">Custom Trigger</h2>
				<MyDropdown
					trigger={<CustomTrigger isOpen={false} />}
					items={basicItems}
					onItemSelect={handleItemSelect}
					renderTrigger={(trigger, isOpen) =>
						React.cloneElement(trigger, { isOpen })
					}
				/>
			</div>

			{/* Custom Item Renderer */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold">Custom Item Renderer</h2>
				<MyDropdown
					trigger={
						<DropdownTrigger variant="secondary">
							Custom Items <ChevronDownIcon />
						</DropdownTrigger>
					}
					items={advancedItems}
					onItemSelect={handleItemSelect}
					renderItem={renderCustomItem}
					dropdownClassName="w-64"
				/>
			</div>

			{/* Different Positions */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold">Different Positions</h2>
				<div className="grid grid-cols-2 gap-4 max-w-md">
					<MyDropdown
						trigger={<DropdownTrigger>Top Left</DropdownTrigger>}
						items={basicItems.slice(0, 3)}
						position="top-left"
					/>
					<MyDropdown
						trigger={<DropdownTrigger>Top Right</DropdownTrigger>}
						items={basicItems.slice(0, 3)}
						position="top-right"
					/>
					<MyDropdown
						trigger={<DropdownTrigger>Bottom Left</DropdownTrigger>}
						items={basicItems.slice(0, 3)}
						position="bottom-left"
					/>
					<MyDropdown
						trigger={<DropdownTrigger>Bottom Right</DropdownTrigger>}
						items={basicItems.slice(0, 3)}
						position="bottom-right"
					/>
				</div>
			</div>

			{/* Disabled State */}
			<div className="space-y-4">
				<h2 className="text-lg font-semibold">Disabled State</h2>
				<MyDropdown
					trigger={<DropdownTrigger>Disabled Dropdown</DropdownTrigger>}
					items={basicItems}
					disabled={true}
				/>
			</div>
		</div>
	);
};

export default DropdownExample;
