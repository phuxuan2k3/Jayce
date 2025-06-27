import React, { createContext, useContext } from "react";
import { TestCoreSchema } from "../../api/test.api-gen-v2";
import { Clock, Calendar } from "lucide-react";

// Context for sharing test and handlers
interface TestCoreCardContextProps {
	test: TestCoreSchema;
	onClick?: () => void;
}
const TestCoreCardContext = createContext<TestCoreCardContextProps | undefined>(undefined);

function useTestCoreCardContext() {
	const ctx = useContext(TestCoreCardContext);
	if (!ctx) throw new Error("TestCoreCard subcomponent must be used within TestCoreCard");
	return ctx;
}

// Header
const TestCoreCardHeader: React.FC = () => {
	const { test } = useTestCoreCardContext();
	const modeColors: Record<string, string> = {
		EXAM: "bg-red-100 text-red-700",
		PRACTICE: "bg-blue-100 text-blue-700",
	};
	const modeClass = modeColors[test.mode] || "bg-gray-100 text-gray-700";

	return (
		<div className="flex flex-col gap-2 border-b border-primary-toned-200 pb-2">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<h3 className="font-bold text-lg">{test.title}</h3>
				</div>
				<span className={`text-xs px-2 py-1 rounded-full ${modeClass}`}>
					{test.mode}
				</span>
			</div>
		</div>
	);
};

// Content
const TestCoreCardContent: React.FC = () => {
	const { test } = useTestCoreCardContext();
	return (
		<div className="mt-2">
			<p className="text-primary-toned-600 text-sm">{test.description}</p>
		</div>
	);
};

// Details
const TestCoreCardDetails: React.FC = () => {
	const { test } = useTestCoreCardContext();
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div className="flex flex-wrap gap-4 mt-3 text-sm text-primary-toned-500">
			<div className="flex items-center gap-1">
				<Clock size={14} />
				<span>{test.minutesToAnswer} min</span>
			</div>
			<div className="flex items-center gap-1">
				<Calendar size={14} />
				<span>Created {formatDate(test.createdAt)}</span>
			</div>
			<div>
				<span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
					{test.language.toUpperCase()}
				</span>
			</div>
		</div>
	);
};

// Footer
const TestCoreCardFooter: React.FC = () => {
	const { test } = useTestCoreCardContext();
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div className="flex justify-between items-center mt-4 pt-2 border-t border-primary-toned-100">
			<span className="text-xs text-primary-toned-400">
				Updated: {formatDate(test.updatedAt)}
			</span>
			<span className="text-xs text-primary-toned-400">
				ID: {test.id}
			</span>
		</div>
	);
};

// Main Card
export type TestCoreCardProps = {
	test: TestCoreSchema;
	onClick?: (test: TestCoreSchema) => void;
};

const TestCoreCard: React.FC<TestCoreCardProps> = ({ test, onClick }) => (
	<TestCoreCardContext.Provider value={{
		test,
		onClick: onClick ? () => onClick?.(test) : undefined,
	}}>
		<div
			className="border border-primary-toned-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
			onClick={() => onClick?.(test)}
		>
			<TestCoreCardHeader />
			<TestCoreCardContent />
			<TestCoreCardDetails />
			<TestCoreCardFooter />
		</div>
	</TestCoreCardContext.Provider>
);

export default TestCoreCard;
