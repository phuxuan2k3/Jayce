import { ConfigItemProps } from '../types';
import { getStatusStyles } from '../utils';

export const ConfigItem = ({ label, value, isStatus, statusType = 'neutral' }: ConfigItemProps) => {
	return (
		<div className="flex justify-between">
			<span className="font-medium text-gray-600">{label}:</span>
			{isStatus ? (
				<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(statusType)}`}>
					{value}
				</span>
			) : (
				<span className="text-gray-800">{value}</span>
			)}
		</div>
	);
};
