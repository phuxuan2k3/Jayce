import React from 'react'
import MyDropdown, { DefaultDropdownItemClassName } from '../../../../../features/tests/ui/MyDropdown';
import { Status, StatusesAsConst } from '../types';
import { CheckboxIcon } from '../../../../../components/icons/CheckboxIcon';
import MyButton from '../../../../../features/tests/ui/buttons/MyButton';
import { cn } from '../../../../../app/cn';
import { useLanguage } from '../../../../../LanguageProvider';

export default function StatusDropdown({
	statuses,
	setStatuses
}: {
	statuses: Status[];
	setStatuses: React.Dispatch<React.SetStateAction<Status[]>>;
}) {
	const { t } = useLanguage();

	const isChecked = (status: Status) => statuses.includes(status);

	return (
		<MyDropdown
			items={[...StatusesAsConst.map(status => ({
				label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
				value: status,
				id: status,
			}))]}
			renderItem={({ label, id }) => (
				<button
					className={DefaultDropdownItemClassName}
					key={id}
					onClick={(e) => {
						e.stopPropagation();
						if (statuses.includes(id as Status)) {
							setStatuses((prev) => prev.filter((s) => s !== id));
						} else {
							setStatuses((prev) => [...prev, id as Status]);
						}
					}}
				>
					<div
						className={cn(
							"w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center",
							isChecked(id as Status)
								? "bg-primary border-primary"
								: "bg-white border-gray-300 hover:border-primary-toned-400",
						)}
					>
						{isChecked(id as Status) && <CheckboxIcon />}
					</div>
					{label}
				</button>
			)}
			trigger={
				<MyButton
					variant="outline"
					size="medium"
				>
					{t("manager_tests_status")}
				</MyButton>
			}
		/>
	)
}
