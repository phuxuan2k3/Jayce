import { ReactNode } from 'react';
import QuickActionPrimitive, { QuickActionVariantsType } from './QuickActionPrimitive';

export type QuickActionProps = {
	icon: ReactNode;
	title: string;
	description: string;
	onClick: () => void;
	className?: string;
} & QuickActionVariantsType;

const QuickAction = ({
	className = '',
	icon,
	title,
	description,
	onClick,
	...variant
}: QuickActionProps) => (
	<QuickActionPrimitive.Root
		onClick={onClick}
		{...variant}
		className={className}
	>
		<QuickActionPrimitive.Icon icon={icon} />

		<div className="text-left">
			<QuickActionPrimitive.Title title={title} />
			<QuickActionPrimitive.Description description={description} />
		</div>

	</QuickActionPrimitive.Root>
);

export default QuickAction;