import CommonButton from './CommonButton'

export default function DangerButton({
	children
}: {
	children?: React.ReactNode
}) {
	return (
		<CommonButton backgroundColor='bg-red-600' >
			{children}
		</CommonButton>
	)
}
