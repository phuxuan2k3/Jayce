import { createContext, ReactNode, useContext } from 'react'
import { cva } from 'class-variance-authority';
import { VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../app/cn';

// ===================================
// Variants
// ===================================

const QuickActionCVA = cva(
	"flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
	{
		variants: {
			variant: {
				default: "text-primary bg-gradient-to-r from-primary-toned-50 to-primary-toned-100",
				alert: "text-secondary bg-gradient-to-r from-secondary-toned-50 to-secondary-toned-100",
			},
			active: {
				true: "shadow-lg",
				false: "hover:shadow-md hover:translate-y-[-2px]",
			}
		},
		compoundVariants: [
			{
				variant: 'default',
				active: true,
				className: "bg-primary-toned-200 shadow-lg",
			},
			{
				variant: 'alert',
				active: true,
				className: "bg-secondary-toned-200 shadow-lg",
			},
		],
		defaultVariants: {
			variant: 'default',
			active: false,
		},
	}
);

export type QuickActionVariantsType = VariantProps<typeof QuickActionCVA>;

// ===================================
// Context
// ===================================

type QuickActionContextType = QuickActionVariantsType;

const QuickActionContext = createContext<QuickActionContextType | undefined>(undefined);
const QuickActionProvider = QuickActionContext.Provider;
const useQuickActionContext = () => {
	const context = useContext(QuickActionContext);
	if (!context) {
		throw new Error("useQuickActionContext must be used within a QuickActionProvider");
	}
	return context;
}

// ===================================
// Components
// ===================================

const QuickActionRoot = ({
	children,
	className,
	variant = 'default',
	active = false,
	onClick,
}: {
	className?: string;
	onClick: () => void;
	children: ReactNode;
} & QuickActionVariantsType) => (
	<QuickActionProvider
		value={{ variant, active }}>
		<button
			className={cn(
				QuickActionCVA({ variant }),
				className,
			)}
			onClick={onClick}>
			{children}
		</button>
	</QuickActionProvider>
);

const QuickActionIcon = ({
	icon,
	className,
}: {
	className?: string;
	icon: ReactNode;
}) => (
	<div className={cn("rounded-full p-2 text-white max-w-10 max-h-10 w-10 h-10 flex items-center justify-center", {
		"bg-primary": useQuickActionContext().variant === 'default',
		"bg-secondary": useQuickActionContext().variant === 'alert',
	}, className)}>
		{icon}
	</div>
);

const QuickActionTitle = ({
	title,
}: {
	title: string;
}) => (
	<div className="font-semibold">{title}</div>
);

const QuickActionDescription = ({
	description,
}: {
	description: string;
}) => (
	<div className={cn("text-xs", {
		"text-primary-toned-500": useQuickActionContext().variant === 'default',
		"text-secondary-toned-500": useQuickActionContext().variant === 'alert',
	})}>{description}</div>
);

const QuickActionPrimitive = {
	Root: QuickActionRoot,
	Icon: QuickActionIcon,
	Title: QuickActionTitle,
	Description: QuickActionDescription,
}

export default QuickActionPrimitive;