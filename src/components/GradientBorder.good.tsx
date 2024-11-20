import classNames from "classnames";

export default function GradientBorderGood({ className, children }: { className?: string, children?: React.ReactNode }) {
	return (
		<div className={classNames("p-[2px] bg-gradient-1 rounded-lg", className)}>
			<div className="bg-blue-chill-100 rounded-md py-1 px-2">
				{children}
			</div>
		</div>
	);
}
