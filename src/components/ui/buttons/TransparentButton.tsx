import React from 'react'
import CommonButton from './CommonButton'

export default function TransparentButton({
	children,
}: {
	children?: React.ReactNode
}) {
	return (
		<CommonButton backgroundColor='transparent' >
			{children}
		</CommonButton>
	)
}
