import { ReactNode } from 'react';
import QuickActionPrimitive, { QuickActionVariantsType } from './QuickActionPrimitive';

export type QuickActionProps = {
	icon: ReactNode;
	title: string;
	description: string;
	onClick: () => void;
} & QuickActionVariantsType;

const QuickAction = ({
	icon,
	title,
	description,
	onClick,
	...variant
}: QuickActionProps) => (
	<QuickActionPrimitive.Root
		onClick={onClick}
		{...variant}
	>
		<QuickActionPrimitive.Icon icon={icon} />

		<div className="text-left">
			<QuickActionPrimitive.Title title={title} />
			<QuickActionPrimitive.Description description={description} />
		</div>

	</QuickActionPrimitive.Root>
);

export default QuickAction;