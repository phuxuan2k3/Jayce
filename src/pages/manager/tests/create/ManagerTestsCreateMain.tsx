import { useMemo } from 'react'
import TestCreateStep1 from './Steps/TestCreateStep1';
import TestCreateStep2 from './Steps/TestCreateStep2';
import { useTestCreateTab } from './contexts/test-create-tab.context';
import TestCreateStep3 from './Steps/TestCreateStep3';

export default function ManagerTestsCreateMain() {
	const { activeTab } = useTestCreateTab();
	const StepComponent = useMemo(() => {
		switch (activeTab) {
			case 0:
				return <TestCreateStep1 />;
			case 1:
				return <TestCreateStep2 />;
			case 2:
				return <TestCreateStep3 />;
			default:
				return null;
		}
	}, [activeTab]);

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			{StepComponent}
		</div>
	);
}