import React from 'react'
import CommonButton from './CommonButton'

export default function TransparentButton({
	children,
	onClick = () => { },
}: {
	children?: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<CommonButton
			onClick={onClick}
			backgroundColor='transparent' >
			{children}
		</CommonButton>
	)
}
