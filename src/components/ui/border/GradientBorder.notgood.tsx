import classNames from "classnames";

export default function GradientBorderNotGood({ className, children }: { className?: string, children?: React.ReactNode }) {
	return (
		<div className={classNames("p-[0.8px] bg-gradient-1 rounded-lg", className)}>
			<div className="bg-white rounded-md text-sm py-1 px-2">
				{children}
			</div>
		</div>
	);
}
