import { StatCardProps } from '../types';

export const StatCard = ({ value, label }: StatCardProps) => {
	return (
		<div className="bg-primary-toned-50 rounded-lg p-4 text-center">
			<div className="text-2xl font-bold text-primary">{value}</div>
			<div className="text-sm text-primary-toned-600">{label}</div>
		</div>
	);
};
