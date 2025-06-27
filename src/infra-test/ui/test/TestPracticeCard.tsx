import { ReactNode, createContext, useContext } from 'react';
import { PracticeCore } from "../../core/test.model";

// Create Context
type TestCardContextType = {
	test: PracticeCore;
	onTestClicked: (testId: string) => void;
} | null;

const TestCardContext = createContext<TestCardContextType>(null);

// Hook to use the context
const useTestCard = () => {
	const context = useContext(TestCardContext);
	if (!context) {
		throw new Error('TestCard compound components must be used within TestCard');
	}
	return context;
};

// Main component
type Props = {
	test: PracticeCore;
	onTestClicked: (testId: string) => void;
	children: ReactNode;
};

const TestPracticeCard = ({ test, onTestClicked, children }: Props) => {
	return (
		<TestCardContext.Provider value={{ test, onTestClicked }}>
			<div className="border border-primary-toned-300 rounded-lg p-4 hover:shadow-md transition-shadow">
				{children}
			</div>
		</TestCardContext.Provider>
	);
};

// Subcomponents
const Header = () => {
	const { test } = useTestCard();
	return (
		<div className="flex justify-between">
			<h3 className="font-bold text-lg">{test.title}</h3>
			<span className="text-sm bg-primary-toned-100 text-primary-toned-700 px-2 py-1 rounded-full">
				{test.difficulty}
			</span>
		</div>
	);
};

const Description = () => {
	const { test } = useTestCard();
	return <p className="text-primary-toned-600 text-sm mt-2">{test.description}</p>;
};

const Tags = () => {
	const { test } = useTestCard();
	return (
		<div className="flex flex-wrap gap-1 mt-2">
			{test.tags.map(tag => (
				<span key={tag} className="text-xs bg-blue-chill-100 text-blue-chill-700 px-2 py-1 rounded-full">
					{tag}
				</span>
			))}
		</div>
	);
};

const Footer = () => {
	const { test, onTestClicked: onManageTest } = useTestCard();
	return (
		<div className="flex justify-between items-center mt-4">
			<MetaInfo />
			<button
				onClick={() => onManageTest(test.id)}
				className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
			>
				View Test
			</button>
		</div>
	);
};

const MetaInfo = () => {
	const { test } = useTestCard();
	return (
		<div>
			<span className="text-sm text-primary-toned-500">
				Created: {new Date(test.createdAt).toLocaleDateString()} • {test.minutesToAnswer} min
			</span>
			<div className="flex items-center mt-1">
				<span className="text-sm text-primary-toned-500 mr-2">Rating:</span>
				{test.feedback ? (
					<Rating value={test.feedback.rating} />
				) : (
					<span className="text-sm text-gray-400">No ratings yet</span>
				)}
			</div>
		</div>
	);
};

const Rating = ({ value }: { value: number }) => {
	return (
		<div className="flex">
			{[1, 2, 3, 4, 5].map(star => (
				<span key={star} className={`text-lg ${star <= value ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
			))}
		</div>
	);
};

// Compose the component
TestPracticeCard.Header = Header;
TestPracticeCard.Description = Description;
TestPracticeCard.Tags = Tags;
TestPracticeCard.Footer = Footer;
TestPracticeCard.MetaInfo = MetaInfo;
TestPracticeCard.Rating = Rating;

// Default composed component for backwards compatibility
export const DefaultTestPracticeCard = ({
	test,
	onTestClicked,
}: {
	test: PracticeCore;
	onTestClicked: (testId: string) => void;
}) => {
	return (
		<TestPracticeCard test={test} onTestClicked={onTestClicked}>
			<TestPracticeCard.Header />
			<TestPracticeCard.Description />
			<TestPracticeCard.Tags />
			<TestPracticeCard.Footer />
		</TestPracticeCard>
	);
};

export default TestPracticeCard;