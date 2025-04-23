import classNames from "classnames";

export default function GradientBorderGood({ className, children, onClick, bgClass }: { className?: string, children?: React.ReactNode, onClick?: () => void, bgClass?: string | null }) {
	return (
		<div onClick={onClick} className={classNames("p-[2px] bg-gradient-1 rounded-lg", className)}>
			<div className={`${bgClass ?? "bg-primary-toned-100"} rounded-md py-1 px-2`}>
				{children}
			</div>
		</div>
	);
}
