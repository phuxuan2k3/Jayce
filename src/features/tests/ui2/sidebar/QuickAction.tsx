import { ReactNode } from 'react';
import QuickActionPrimitive from './QuickActionPrimitive';

type QuickActionProps = {
	icon: ReactNode;
	title: string;
	description: string;
	onClick: () => void;
	variant?: 'default' | 'alert';
};

const QuickAction = ({
	icon,
	title,
	description,
	onClick,
	variant = 'default',
}: QuickActionProps) => (
	<QuickActionPrimitive.Root
		onClick={onClick}
		variant={variant}
	>
		<QuickActionPrimitive.Icon icon={icon} />

		<div className="text-left">
			<QuickActionPrimitive.Title title={title} />
			<QuickActionPrimitive.Description description={description} />
		</div>

	</QuickActionPrimitive.Root>
);

export default QuickAction;