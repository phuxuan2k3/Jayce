import { useState } from 'react';
import { cn } from '../../app/cn';
import { BaseComponentProps } from '../ui-items/question/primitives/types';

export function MySlider({
	className = "", children, trigger, maxHeight = '24rem'
}: BaseComponentProps & {
	trigger: ({
		onClick,
		isShow
	}: {
		onClick: () => void;
		isShow: boolean;
	}) => React.ReactNode;
	maxHeight?: string | number;
}) {
	const [show, setShow] = useState(false);

	return (
		<div className='flex flex-col'>
			{trigger({
				onClick: () => setShow(!show),
				isShow: show
			})}
			<div className={cn(
				"transition-all duration-500 ease-in-out overflow-hidden",
				className
			)}
				style={{
					maxHeight: show ? maxHeight : '0',
					overflowY: show ? 'auto' : 'hidden',
				}}
			>
				{children}
			</div>
		</div>
	);
}
