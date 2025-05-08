import { ReactNode } from 'react';

type QuickActionProps = {
	icon: ReactNode;
	title: string;
	description: string;
	onClick: () => void;
};

const QuickAction = ({ icon, title, description, onClick }: QuickActionProps) => (
	<button
		onClick={onClick}
		className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-toned-50 to-primary-toned-100 text-primary rounded-lg hover:shadow-md transition-all hover:translate-y-[-2px]"
	>
		<div className="bg-primary rounded-full p-2 text-white">
			{icon}
		</div>
		<div className="text-left">
			<div className="font-semibold">{title}</div>
			<div className="text-xs text-primary-toned-600">{description}</div>
		</div>
	</button>
);

export default QuickAction;