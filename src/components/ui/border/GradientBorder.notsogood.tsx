import classNames from "classnames";

export default function GradientBorderNotSoGood({ className, children }: { className?: string, children?: React.ReactNode }) {
	return (
		<div className={classNames("p-[1px] bg-gradient-1 rounded-md", className)}>
			<div className="bg-white rounded-md py-1 px-2">
				{children}
			</div>
		</div>
	);
}
